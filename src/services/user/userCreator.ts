import assert from 'assert';
import EmailSender from '../../services/emailSender';
import UserRepository from '../../database/repositories/userRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TenantUserRepository from '../../database/repositories/tenantUserRepository';
import { tenantSubdomain } from '../tenantSubdomain';
import { IServiceOptions } from '../IServiceOptions';
import Error400 from '../../errors/Error400';
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;

export default class UserCreator {
  options: IServiceOptions;
  session;
  data;
  emailsToInvite: Array<any> = [];
  emails: any = [];
  sendInvitationEmails = true;

  constructor(options) {
    this.options = options;
  }

  /**
   * Creates new user(s) via the User page.
   * Sends Invitation Emails if flagged.
   */
  async invite(data, sendInvitationEmails = true) {
    this.data = data;
    this.sendInvitationEmails = sendInvitationEmails;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession(
        this.options.database,
      );

      await this._addOrUpdateAll();

      await MongooseRepository.commitTransaction(
        this.session,
      );
    } catch (error) {
      await MongooseRepository.abortTransaction(
        this.session,
      );
      throw error;
    }

    if (this._hasEmailsToInvite) {
      await this._sendAllInvitationEmails();
    }
  }

  async execute(data) {
    this.data = data;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession(
        this.options.database,
      );

      const isExisted = Boolean(
        await UserRepository.count(
          { email: data.email },
          { ...this.options, session: this.session },
        ),
      );

      if (isExisted)
        throw new Error400(
          this.options.language,
          'auth.emailAlreadyInUse',
        );

      const hashedPassword = data.password
        ? await bcrypt.hash(
            data.password,
            BCRYPT_SALT_ROUNDS,
          )
        : null;

      let user = await UserRepository.createFromAuth(
        { ...data, password: hashedPassword },
        {
          ...this.options,
          session: this.session,
        },
      );

      await TenantUserRepository.create(
        this.options.currentTenant,
        user,
        this._roles,
        {
          ...this.options,
          session: this.session,
        },
      );

      await MongooseRepository.commitTransaction(
        this.session,
      );
    } catch (error) {
      await MongooseRepository.abortTransaction(
        this.session,
      );
      throw error;
    }
  }

  get _roles() {
    if (
      this.data.roles &&
      !Array.isArray(this.data.roles)
    ) {
      return [this.data.roles];
    } else {
      const uniqueRoles = [...new Set(this.data.roles)];
      return uniqueRoles;
    }
  }

  get _emails() {
    if (
      this.data.emails &&
      !Array.isArray(this.data.emails)
    ) {
      this.emails = [this.data.emails];
    } else {
      const uniqueEmails = [...new Set(this.data.emails)];
      this.emails = uniqueEmails;
    }

    return this.emails.map((email) => email.trim());
  }

  /**
   * Creates or updates many users at once.
   */
  async _addOrUpdateAll() {
    return Promise.all(
      this.emails.map((email) => this._addOrUpdate(email)),
    );
  }

  /**
   * Creates or updates the user passed.
   * If the user already exists, it only adds the role to the user.
   */
  async _addOrUpdate(email) {
    let user =
      await UserRepository.findByEmailWithoutAvatar(email, {
        ...this.options,
        session: this.session,
      });

    if (!user) {
      user = await UserRepository.create(
        { email },
        {
          ...this.options,
          session: this.session,
        },
      );
    }

    const isUserAlreadyInTenant = user.tenants.some(
      (userTenant) =>
        userTenant.tenant.id ===
        this.options.currentTenant.id,
    );

    const tenantUser =
      await TenantUserRepository.updateRoles(
        this.options.currentTenant.id,
        user.id,
        this._roles,
        {
          ...this.options,
          addRoles: true,
          session: this.session,
        },
      );

    if (!isUserAlreadyInTenant) {
      this.emailsToInvite.push({
        email,
        token: tenantUser.invitationToken,
      });
    }
  }

  get _hasEmailsToInvite() {
    return (
      this.emailsToInvite && this.emailsToInvite.length
    );
  }

  async _sendAllInvitationEmails() {
    if (!this.sendInvitationEmails) {
      return;
    }

    return Promise.all(
      this.emailsToInvite.map((emailToInvite) => {
        const link = `${tenantSubdomain.frontendUrl(
          this.options.currentTenant,
        )}/auth/invitation?token=${emailToInvite.token}`;

        return new EmailSender(
          EmailSender.TEMPLATES.INVITATION,
          {
            tenant: this.options.currentTenant,
            link,
          },
        ).sendTo(emailToInvite.email);
      }),
    );
  }

  async _validate() {
    assert(
      this.options.currentUser,
      'currentUser is required',
    );

    assert(
      this.options.currentTenant.id,
      'tenantId is required',
    );

    assert(
      this.options.currentUser.id,
      'currentUser.id is required',
    );

    assert(
      this.options.currentUser.email,
      'currentUser.email is required',
    );

    assert(
      this._emails && this._emails.length,
      'emails is required',
    );

    assert(
      this._roles && this._roles.length,
      'roles is required',
    );
  }
}
