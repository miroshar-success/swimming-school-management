import { getUserNameOrEmailPrefix } from '../../utils/userUtils';
import { IRepositoryOptions } from './IRepositoryOptions';
import { isUserInTenant } from '../utils/userTenantUtils';
import AuditLogRepository from './auditLogRepository';
import crypto from 'crypto';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import MuiRepository from './muiRepository';
import SettingsRepository from './settingsRepository';
import User from '../models/user';
export default class UserRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    data = this._preSave(data);

    const [user] = await User(options.database).create(
      [
        {
          email: data.email,
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          fullName: data.fullName || null,
          phoneNumber: data.phoneNumber || null,
          studentNumber: data.studentNumber || null,
          importHash: data.importHash || null,
          avatars: data.avatars || [],
          street: data.street || null,
          postalCode: data.postalCode || null,
          cologne: data.cologne || null,
          city: data.city || null,
          RFC: data.RFC || null,
          CURP: data.CURP || null,
          bloodType: data.bloodType || null,
          sex: data.sex || null,
          birthday: data.birthday || null,
          guardianFullName: data.guardianFullName || null,
          guardianPhoneNumber:
            data.guardianPhoneNumber || null,
          healthInsuranceCompany:
            data.healthInsuranceCompany || null,
          healthInsuranceNumber:
            data.healthInsuranceNumber || null,
          comment: data.comment || null,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async createFromAuth(
    data,
    options: IRepositoryOptions,
  ) {
    data = this._preSave(data);

    let [user] = await User(options.database).create(
      [
        {
          email: data.email,
          password: data.password,
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          fullName: data.fullName || null,
          phoneNumber: data.phoneNumber || null,
          studentNumber: data.studentNumber || null,
          importHash: data.importHash || null,
          avatars: data.avatars || [],
          street: data.street || null,
          postalCode: data.postalCode || null,
          cologne: data.cologne || null,
          city: data.city || null,
          RFC: data.RFC || null,
          CURP: data.CURP || null,
          bloodType: data.bloodType || null,
          sex: data.sex || null,
          birthday: data.birthday || null,
          guardianFullName: data.guardianFullName || null,
          guardianPhoneNumber:
            data.guardianPhoneNumber || null,
          healthInsuranceCompany:
            data.healthInsuranceCompany || null,
          healthInsuranceNumber:
            data.healthInsuranceNumber || null,
          comment: data.comment || null,
        },
      ],
      options,
    );

    delete user.password;
    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async updatePassword(
    id,
    password,
    invalidateOldTokens: boolean,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const data: any = {
      password,
      updatedBy: currentUser.id,
    };

    if (invalidateOldTokens) {
      data.jwtTokenInvalidBefore = new Date();
    }

    await User(options.database).updateOne(
      { _id: id },
      data,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          password: 'secret',
        },
      },
      options,
    );

    return this.findById(id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async updateProfile(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    data = this._preSave(data);

    await User(options.database).updateOne(
      { _id: id },
      {
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        fullName: data.fullName || null,
        phoneNumber: data.phoneNumber || null,
        updatedBy: currentUser.id,
        avatars: data.avatars || [],
      },
      options,
    );

    const user = await this.findById(id, options);

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }

  static async generateEmailVerificationToken(
    email,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const { id } = await this.findByEmailWithoutAvatar(
      email,
      options,
    );

    const emailVerificationToken = crypto
      .randomBytes(20)
      .toString('hex');
    const emailVerificationTokenExpiresAt =
      Date.now() + 24 * 60 * 60 * 1000;

    await User(options.database).updateOne(
      { _id: id },
      {
        emailVerificationToken,
        emailVerificationTokenExpiresAt,
        updatedBy: currentUser.id,
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          emailVerificationToken,
          emailVerificationTokenExpiresAt,
        },
      },
      options,
    );

    return emailVerificationToken;
  }

  static async generatePasswordResetToken(
    email,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const { id } = await this.findByEmailWithoutAvatar(
      email,
      options,
    );

    const passwordResetToken = crypto
      .randomBytes(20)
      .toString('hex');
    const passwordResetTokenExpiresAt =
      Date.now() + 24 * 60 * 60 * 1000;

    await User(options.database).updateOne(
      { _id: id },
      {
        passwordResetToken,
        passwordResetTokenExpiresAt,
        updatedBy: currentUser.id,
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          passwordResetToken,
          passwordResetTokenExpiresAt,
        },
      },
      options,
    );

    return passwordResetToken;
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    data = this._preSave(data);

    await User(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: currentUser.id,
      },
      options,
    );

    const user = await this.findById(id, options);

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }

  static async findByEmail(
    email,
    options: IRepositoryOptions,
  ) {
    const record = await this.findByEmailWithoutAvatar(
      email,
      options,
    );
    return await this._fillRelationsAndFileDownloadUrls(
      record,
      options,
    );
  }

  static async findByEmailWithoutAvatar(
    email,
    options: IRepositoryOptions,
  ) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .findOne({
          email: {
            $regex: new RegExp(
              `^${MongooseQueryUtils.escapeRegExp(email)}$`,
            ),
            $options: 'i',
          },
        })
        .populate('avatars')
        .populate('tenants.tenant')
        .populate({
          path: 'lessons',
          populate: {
            path: 'class',
          },
        }),
      options,
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    role,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    if (role === 'admin') {
      criteriaAnd.push({
        tenants: {
          $elemMatch: {
            tenant: currentTenant.id,
            roles: {
              $elemMatch: { $in: ['admin', 'manager'] },
            },
          },
        },
      });
    } else if (role === 'teacher') {
      criteriaAnd.push({
        tenants: {
          $elemMatch: {
            tenant: currentTenant.id,
            roles: {
              $elemMatch: { $in: ['teacher'] },
            },
          },
        },
      });
    } else {
      criteriaAnd.push({
        tenants: {
          $elemMatch: {
            tenant: currentTenant.id,
            roles: {
              $elemMatch: { $in: ['student'] },
            },
          },
        },
      });
    }

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.fullName) {
        criteriaAnd.push({
          ['fullName']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.fullName,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.email) {
        criteriaAnd.push({
          ['email']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.email,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.role) {
        criteriaAnd.push({
          tenants: { $elemMatch: { roles: filter.role } },
        });
      }

      if (filter.status) {
        criteriaAnd.push({
          tenants: {
            $elemMatch: { status: filter.status },
          },
        });
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .find(criteria)
          .skip(skip)
          .limit(limitEscaped)
          .sort(sort)
          .populate('avatars')
          .populate('tenants.tenant')
          .populate({
            path: 'lessons',
            populate: {
              path: 'class',
            },
          }),
        options,
      );

    const count =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).countDocuments(criteria),
        options,
      );

    rows = this._mapUserForTenantForRows(
      rows,
      currentTenant,
    );
    rows = await Promise.all(
      rows.map((row) =>
        this._fillRelationsAndFileDownloadUrls(
          row,
          options,
          false,
        ),
      ),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    role,
    search,
    limit,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    if (role === 'admin') {
      criteriaAnd.push({
        tenants: {
          $elemMatch: {
            tenant: currentTenant.id,
            roles: {
              $elemMatch: { $in: ['admin', 'manager'] },
            },
          },
        },
      });
    } else if (role === 'teacher') {
      criteriaAnd.push({
        tenants: {
          $elemMatch: {
            tenant: currentTenant.id,
            roles: {
              $elemMatch: { $in: ['teacher'] },
            },
          },
        },
      });
    } else {
      criteriaAnd.push({
        tenants: {
          $elemMatch: {
            tenant: currentTenant.id,
            roles: {
              $elemMatch: { $in: ['student'] },
            },
          },
        },
      });
    }

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            fullName: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
          {
            email: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('fullName_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    let rows =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .find(criteria)
          .limit(limitEscaped)
          .sort(sort)
          .populate('avatars')
          .populate('tenants.tenant')
          .populate({
            path: 'lessons',
            populate: {
              path: 'class',
            },
          }),
        options,
      );

    rows = this._mapUserForTenantForRows(
      rows,
      currentTenant,
    );

    rows = await Promise.all(
      rows.map((row) =>
        this._fillRelationsAndFileDownloadUrls(
          row,
          options,
          false,
        ),
      ),
    );

    return rows.map((user) => ({
      id: user.id,
      label: getUserNameOrEmailPrefix(user),
      avatar:
        user.avatars &&
        user.avatars.length &&
        user.avatars[0].downloadUrl
          ? user.avatars[0].downloadUrl
          : null,
    }));
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return ids;
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let users = await User(options.database)
      .find({
        _id: {
          $in: ids,
        },
        tenants: {
          $elemMatch: { tenant: currentTenant.id },
        },
      })
      .select(['_id']);

    return users.map((user) => user._id);
  }

  static async findByIdWithPassword(
    id,
    options: IRepositoryOptions,
  ) {
    return await MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .findById(id)
        .populate('avatars')
        .populate('tenants.tenant')
        .populate({
          path: 'lessons',
          populate: {
            path: 'class',
          },
        }),
      options,
    );
  }

  static async findById(
    id,
    options: IRepositoryOptions,
    metaOnly = false,
  ) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .findById(id)
          .populate('avatars')
          .populate('tenants.tenant')
          .populate({
            path: 'lessons',
            populate: {
              path: 'class',
            },
          }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    if (!options || !options.bypassPermissionValidation) {
      if (!isUserInTenant(record, currentTenant.id)) {
        throw new Error404();
      }

      record = this._mapUserForTenant(
        record,
        currentTenant,
      );
    }

    record = await this._fillRelationsAndFileDownloadUrls(
      record,
      options,
      metaOnly,
    );

    return record;
  }

  static async findPassword(
    id,
    options: IRepositoryOptions,
  ) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .findById(id)
          .select('+password'),
        options,
      );

    if (!record) {
      return null;
    }

    return record.password;
  }

  static async findByIdWithoutAvatar(
    id,
    options: IRepositoryOptions,
  ) {
    return this.findById(id, options);
  }

  /**
   * Finds the user by the password token if not expired.
   */
  static async findByPasswordResetToken(
    token,
    options: IRepositoryOptions,
  ) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findOne({
        passwordResetToken: token,
        passwordResetTokenExpiresAt: { $gt: Date.now() },
      }),
      options,
    );
  }

  /**
   * Finds the user by the email verification token if not expired.
   */
  static async findByEmailVerificationToken(
    token,
    options: IRepositoryOptions,
  ) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findOne({
        emailVerificationToken: token,
        emailVerificationTokenExpiresAt: {
          $gt: Date.now(),
        },
      }),
      options,
    );
  }

  static async markEmailVerified(
    id,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    await User(options.database).updateOne(
      { _id: id },
      {
        emailVerified: true,
        updatedBy: currentUser.id,
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          emailVerified: true,
        },
      },
      options,
    );

    return true;
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database).countDocuments(filter),
      options,
    );
  }

  /**
   * Normalize the user fields.
   */
  static _preSave(data) {
    if (data.firstName || data.lastName) {
      data.fullName = `${(data.firstName || '').trim()} ${(
        data.lastName || ''
      ).trim()}`.trim();
    }

    data.email = data.email ? data.email.trim() : null;

    data.firstName = data.firstName
      ? data.firstName.trim()
      : null;

    data.lastName = data.lastName
      ? data.lastName.trim()
      : null;

    return data;
  }

  /**
   * Maps the users data to show only the current tenant related info
   */
  static _mapUserForTenantForRows(rows, tenant) {
    if (!rows) {
      return rows;
    }

    return rows.map((record) =>
      this._mapUserForTenant(record, tenant),
    );
  }

  /**
   * Maps the user data to show only the current tenant related info
   */
  static _mapUserForTenant(user, tenant) {
    if (!user || !user.tenants) {
      return user;
    }

    const tenantUser = user.tenants.find(
      (tenantUser) =>
        tenantUser &&
        tenantUser.tenant &&
        String(tenantUser.tenant.id) === String(tenant.id),
    );

    delete user.tenants;

    const status = tenantUser ? tenantUser.status : null;
    const roles = tenantUser ? tenantUser.roles : [];

    // If the user is only invited,
    // tenant members can only see its email
    const otherData =
      status === 'active' ? user.toObject() : {};

    return {
      ...otherData,
      id: user.id,
      email: user.email,
      roles,
      status,
    };
  }

  static async _fillRelationsAndFileDownloadUrls(
    record,
    options: IRepositoryOptions,
    metaOnly = true,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    if (metaOnly) {
      return output;
    }

    if (output.tenants && output.tenants.length) {
      await Promise.all(
        output.tenants.map(async (userTenant) => {
          userTenant.tenant.settings =
            await SettingsRepository.find({
              currentTenant: userTenant.tenant,
              ...options,
            });
          userTenant.tenant.mui = await MuiRepository.find({
            currentTenant: userTenant.tenant,
            ...options,
          });
        }),
      );
    }

    output.avatars =
      await FileRepository.cleanupForRelationships(
        output.avatars,
        options,
      );

    return output;
  }

  static async createFromSocial(
    provider,
    providerId,
    email,
    emailVerified,
    firstName,
    lastName,
    options,
  ) {
    let data = {
      email,
      emailVerified,
      providerId,
      provider,
      firstName,
      lastName,
    };

    data = this._preSave(data);

    let [user] = await User(options.database).create(
      [data],
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static REQUIRED_FIELDS = [
    '_id',
    'id',
    'firstName',
    'lastName',
    'email',
    'avatars',
  ];

  static async cleanupForRelationships(
    userOrUsers,
    options: IRepositoryOptions,
  ) {
    if (!userOrUsers) {
      return userOrUsers;
    }

    if (Array.isArray(userOrUsers)) {
      return await Promise.all(
        userOrUsers.map(async (user) => {
          return lodash.pick(
            {
              ...user,
              avatars:
                await FileRepository.cleanupForRelationships(
                  user.avatars,
                  options,
                  true,
                ),
            },
            this.REQUIRED_FIELDS,
          );
        }),
      );
    }

    return lodash.pick(
      {
        ...userOrUsers,
        avatars:
          await FileRepository.cleanupForRelationships(
            userOrUsers.avatars,
            options,
            true,
          ),
      },
      this.REQUIRED_FIELDS,
    );
  }
}
