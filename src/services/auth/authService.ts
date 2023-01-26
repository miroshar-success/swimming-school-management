import UserRepository from '../../database/repositories/userRepository';
import Error400 from '../../errors/Error400';
import bcrypt from 'bcrypt';
import EmailSender from '../../services/emailSender';
import jwt from 'jsonwebtoken';
import TenantUserRepository from '../../database/repositories/tenantUserRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import { getConfig } from '../../config';
import TenantService from '../tenantService';
import TenantRepository from '../../database/repositories/tenantRepository';
import { tenantSubdomain } from '../tenantSubdomain';
import Error401 from '../../errors/Error401';
import moment from 'moment';

const BCRYPT_SALT_ROUNDS = 12;

class AuthService {
  static async signup(data, options: any = {}) {
    const session = await MongooseRepository.createSession(
      options.database,
    );

    console.log(data);

    try {
      data.email = data.email.toLowerCase();

      const existingUser = await UserRepository.findByEmail(
        data.email,
        options,
      );

      // Generates a hashed password to hide the original one.
      const hashedPassword = await bcrypt.hash(
        data.password,
        BCRYPT_SALT_ROUNDS,
      );

      // The user may already exist on the database in case it was invided.
      if (existingUser) {
        // If the user already have an password,
        // it means that it has already signed up
        const existingPassword =
          await UserRepository.findPassword(
            existingUser.id,
            options,
          );

        if (existingPassword) {
          throw new Error400(
            options.language,
            'auth.emailAlreadyInUse',
          );
        }

        /**
         * In the case of the user exists on the database (was invited)
         * it only creates the new password
         */
        await UserRepository.updatePassword(
          existingUser.id,
          hashedPassword,
          false,
          {
            ...options,
            session,
            bypassPermissionValidation: true,
          },
        );

        // Handles onboarding process like
        // invitation, creation of default tenant,
        // or default joining the current tenant
        await this.handleOnboard(
          existingUser,
          data.roles ? data.roles : [],
          data.invitationToken,
          data.tenantId,
          {
            ...options,
            session,
          },
        );

        // Email may have been alreadyverified using the invitation token
        const isEmailVerified = Boolean(
          await UserRepository.count(
            {
              emailVerified: true,
              _id: existingUser.id,
            },
            {
              ...options,
              session,
            },
          ),
        );

        if (!isEmailVerified && EmailSender.isConfigured) {
          await this.sendEmailAddressVerificationEmail(
            options.language,
            existingUser.email,
            data.tenantId,
            {
              ...options,
              session,
              bypassPermissionValidation: true,
            },
          );
        }

        const token = jwt.sign(
          { id: existingUser.id },
          getConfig().AUTH_JWT_SECRET,
          { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
        );

        await MongooseRepository.commitTransaction(session);

        return token;
      }

      const newUser = await UserRepository.createFromAuth(
        {
          ...data,
          firstName: data.firstName
            ? data.firstName
            : data.email.split('@')[0],
          password: hashedPassword,
        },
        {
          ...options,
          session,
        },
      );

      // Handles onboarding process like
      // invitation, creation of default tenant,
      // or default joining the current tenant
      await this.handleOnboard(
        newUser,
        data.roles ? data.roles : [],
        data.invitationToken,
        data.tenantId,
        {
          ...options,
          session,
        },
      );

      // Email may have been alreadyverified using the invitation token
      const isEmailVerified = Boolean(
        await UserRepository.count(
          {
            emailVerified: true,
            _id: newUser.id,
          },
          {
            ...options,
            session,
          },
        ),
      );

      if (!isEmailVerified && EmailSender.isConfigured) {
        await this.sendEmailAddressVerificationEmail(
          options.language,
          newUser.email,
          data.tenantId,
          {
            ...options,
            session,
          },
        );
      }

      const token = jwt.sign(
        { id: newUser.id },
        getConfig().AUTH_JWT_SECRET,
        { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
      );

      await MongooseRepository.commitTransaction(session);

      return token;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      throw error;
    }
  }

  static async findByEmail(email, options: any = {}) {
    email = email.toLowerCase();
    return UserRepository.findByEmail(email, options);
  }

  static async signin(
    email,
    password,
    invitationToken,
    tenantId,
    options: any = {},
  ) {
    const session = await MongooseRepository.createSession(
      options.database,
    );

    try {
      email = email.toLowerCase();
      const user = await UserRepository.findByEmail(
        email,
        options,
      );

      if (!user) {
        throw new Error400(
          options.language,
          'auth.userNotFound',
        );
      }

      const currentPassword =
        await UserRepository.findPassword(user.id, options);

      if (!currentPassword) {
        throw new Error400(
          options.language,
          'auth.wrongPassword',
        );
      }

      const passwordsMatch = await bcrypt.compare(
        password,
        currentPassword,
      );

      if (!passwordsMatch) {
        throw new Error400(
          options.language,
          'auth.wrongPassword',
        );
      }

      // Handles onboarding process like
      // invitation, creation of default tenant,
      // or default joining the current tenant
      await this.handleOnboard(
        user,
        [],
        invitationToken,
        tenantId,
        {
          ...options,
          currentUser: user,
          session,
        },
      );

      const token = jwt.sign(
        { id: user.id },
        getConfig().AUTH_JWT_SECRET,
        { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
      );

      await MongooseRepository.commitTransaction(session);

      return token;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      throw error;
    }
  }

  static async handleOnboard(
    currentUser,
    roles,
    invitationToken,
    tenantId,
    options,
  ) {
    if (invitationToken) {
      try {
        await TenantUserRepository.acceptInvitation(
          invitationToken,
          {
            ...options,
            currentUser,
            bypassPermissionValidation: true,
          },
        );
      } catch (error) {
        console.error(error);
        // In case of invitation acceptance error, does not prevent
        // the user from sign up/in
      }
    }

    const isMultiTenantViaSubdomain =
      ['multi', 'multi-with-subdomain'].includes(
        getConfig().TENANT_MODE,
      ) && tenantId;

    if (isMultiTenantViaSubdomain) {
      await new TenantService({
        ...options,
        currentUser,
      }).joinWithDefaultRolesOrAskApproval(
        {
          tenantId,
          // leave empty to require admin's approval
          roles,
        },
        options,
      );
    }

    const singleTenant =
      getConfig().TENANT_MODE === 'single';

    if (singleTenant) {
      // In case is single tenant, and the user is signing in
      // with an invited email and for some reason doesn't have the token
      // it auto-assigns it
      await new TenantService({
        ...options,
        currentUser,
      }).joinDefaultUsingInvitedEmail(options.session);

      // Creates or join default Tenant
      await new TenantService({
        ...options,
        currentUser,
      }).createOrJoinDefault(
        {
          // leave empty to require admin's approval
          roles,
        },
        options.session,
      );
    }
  }

  static async findByToken(token, options) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getConfig().AUTH_JWT_SECRET,
        (err, decoded) => {
          if (err) {
            reject(err);
            return;
          }

          const id = decoded.id;
          const jwtTokenIat = decoded.iat;

          UserRepository.findById(id, {
            ...options,
            bypassPermissionValidation: true,
          })
            .then((user) => {
              const isTokenManuallyExpired =
                user &&
                user.jwtTokenInvalidBefore &&
                moment
                  .unix(jwtTokenIat)
                  .isBefore(
                    moment(user.jwtTokenInvalidBefore),
                  );

              if (isTokenManuallyExpired) {
                reject(new Error401());
                return;
              }

              // If the email sender id not configured,
              // removes the need for email verification.
              if (user && !EmailSender.isConfigured) {
                user.emailVerified = true;
              }

              if (
                getConfig().TYPE_FORM.toLowerCase() ===
                'true'
              ) {
                user.typeForm = {
                  id: getConfig().TYPE_FORM_ID,
                  apiToken: getConfig().TYPE_FORM_API_TOKEN,
                };
              }

              resolve(user);
            })
            .catch((error) => reject(error));
        },
      );
    });
  }

  static async sendEmailAddressVerificationEmail(
    language,
    email,
    tenantId,
    options,
  ) {
    if (!EmailSender.isConfigured) {
      throw new Error400(language, 'email.error');
    }

    let link;
    try {
      let tenant;

      if (tenantId) {
        tenant = await TenantRepository.findById(tenantId, {
          ...options,
        });
      }

      email = email.toLowerCase();
      const token =
        await UserRepository.generateEmailVerificationToken(
          email,
          options,
        );
      link = `${tenantSubdomain.frontendUrl(
        tenant,
      )}/auth/verify-email?token=${token}`;
    } catch (error) {
      console.error(error);
      throw new Error400(
        language,
        'auth.emailAddressVerificationEmail.error',
      );
    }

    return new EmailSender(
      EmailSender.TEMPLATES.EMAIL_ADDRESS_VERIFICATION,
      { link },
    ).sendTo(email);
  }

  static async sendPasswordResetEmail(
    language,
    email,
    tenantId,
    options,
  ) {
    if (!EmailSender.isConfigured) {
      throw new Error400(language, 'email.error');
    }

    let link;

    try {
      let tenant;

      if (tenantId) {
        tenant = await TenantRepository.findById(tenantId, {
          ...options,
        });
      }

      email = email.toLowerCase();
      const token =
        await UserRepository.generatePasswordResetToken(
          email,
          options,
        );

      link = `${tenantSubdomain.frontendUrl(
        tenant,
      )}/auth/password-reset?token=${token}`;
    } catch (error) {
      console.error(error);
      throw new Error400(
        language,
        'auth.passwordReset.error',
      );
    }

    return new EmailSender(
      EmailSender.TEMPLATES.PASSWORD_RESET,
      { link },
    ).sendTo(email);
  }

  static async verifyEmail(token, options) {
    const currentUser = options.currentUser;

    const user =
      await UserRepository.findByEmailVerificationToken(
        token,
        options,
      );

    if (!user) {
      throw new Error400(
        options.language,
        'auth.emailAddressVerificationEmail.invalidToken',
      );
    }

    if (
      currentUser &&
      currentUser.id &&
      currentUser.id !== user.id
    ) {
      throw new Error400(
        options.language,
        'auth.emailAddressVerificationEmail.signedInAsWrongUser',
        user.email,
        currentUser.email,
      );
    }

    return UserRepository.markEmailVerified(
      user.id,
      options,
    );
  }

  static async passwordReset(
    token,
    password,
    options: any = {},
  ) {
    const user =
      await UserRepository.findByPasswordResetToken(
        token,
        options,
      );

    if (!user) {
      throw new Error400(
        options.language,
        'auth.passwordReset.invalidToken',
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      BCRYPT_SALT_ROUNDS,
    );

    return UserRepository.updatePassword(
      user.id,
      hashedPassword,
      true,
      { ...options, bypassPermissionValidation: true },
    );
  }

  static async changePassword(
    oldPassword,
    newPassword,
    options,
  ) {
    const currentUser = options.currentUser;
    const currentPassword =
      await UserRepository.findPassword(
        options.currentUser.id,
        options,
      );

    const passwordsMatch = await bcrypt.compare(
      oldPassword,
      currentPassword,
    );

    if (!passwordsMatch) {
      throw new Error400(
        options.language,
        'auth.passwordChange.invalidPassword',
      );
    }

    const newHashedPassword = await bcrypt.hash(
      newPassword,
      BCRYPT_SALT_ROUNDS,
    );

    return UserRepository.updatePassword(
      currentUser.id,
      newHashedPassword,
      true,
      options,
    );
  }

  static async signinFromSocial(
    provider,
    providerId,
    email,
    emailVerified,
    firstName,
    lastName,
    options: any = {},
  ) {
    if (!email) {
      throw new Error('auth-no-email');
    }

    const session = await MongooseRepository.createSession(
      options.database,
    );

    try {
      email = email.toLowerCase();
      let user = await UserRepository.findByEmail(
        email,
        options,
      );

      if (
        user &&
        (user.provider !== provider ||
          user.providerId !== providerId)
      ) {
        throw new Error('auth-invalid-provider');
      }

      if (!user) {
        user = await UserRepository.createFromSocial(
          provider,
          providerId,
          email,
          emailVerified,
          firstName,
          lastName,
          options,
        );
      }

      const token = jwt.sign(
        { id: user.id },
        getConfig().AUTH_JWT_SECRET,
        { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
      );

      await MongooseRepository.commitTransaction(session);

      return token;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      throw error;
    }
  }
}

export default AuthService;
