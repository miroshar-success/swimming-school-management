import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import OrganizationProfile from '../models/organizationProfile';

class OrganizationProfileRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await OrganizationProfile(
      options.database,
    ).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        OrganizationProfile(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await OrganizationProfile(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    record = await this.findById(id, options);

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        OrganizationProfile(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await OrganizationProfile(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );
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
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await OrganizationProfile(
      options.database,
    )
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      OrganizationProfile(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        OrganizationProfile(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    return this._mapRelationshipsAndFillDownloadUrl(
      record,
      options,
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.companyName) {
        criteriaAnd.push({
          companyName: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.companyName,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.industry) {
        criteriaAnd.push({
          industry: filter.industry,
        });
      }

      if (filter.employee) {
        criteriaAnd.push({
          employee: filter.employee,
        });
      }

      if (filter.thirdParties) {
        criteriaAnd.push({
          thirdParties: filter.thirdParties,
        });
      }

      if (filter.locationRange) {
        const [start, end] = filter.locationRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            location: {
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
            location: {
              $lte: end,
            },
          });
        }
      }

      if (filter.regulatoryCompliance) {
        criteriaAnd.push({
          regulatoryCompliance: {
            $all: filter.regulatoryCompliance,
          },
        });
      }

      if (filter.technologyStack) {
        criteriaAnd.push({
          technologyStack: filter.technologyStack,
        });
      }

      if (
        filter.outsourcedIT === true ||
        filter.outsourcedIT === 'true' ||
        filter.outsourcedIT === false ||
        filter.outsourcedIT === 'false'
      ) {
        criteriaAnd.push({
          outsourcedIT:
            filter.outsourcedIT === true ||
            filter.outsourcedIT === 'true',
        });
      }

      if (
        filter.outsourcedSecurityOperations === true ||
        filter.outsourcedSecurityOperations === 'true' ||
        filter.outsourcedSecurityOperations === false ||
        filter.outsourcedSecurityOperations === 'false'
      ) {
        criteriaAnd.push({
          outsourcedSecurityOperations:
            filter.outsourcedSecurityOperations === true ||
            filter.outsourcedSecurityOperations === 'true',
        });
      }

      if (filter.pastIncidents) {
        criteriaAnd.push({
          pastIncidents: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.pastIncidents,
            ),
            $options: 'i',
          },
        });
      }

      if (
        filter.cspSecurityPolicies === true ||
        filter.cspSecurityPolicies === 'true' ||
        filter.cspSecurityPolicies === false ||
        filter.cspSecurityPolicies === 'false'
      ) {
        criteriaAnd.push({
          cspSecurityPolicies:
            filter.cspSecurityPolicies === true ||
            filter.cspSecurityPolicies === 'true',
        });
      }

      if (
        filter.cspListITAssets === true ||
        filter.cspListITAssets === 'true' ||
        filter.cspListITAssets === false ||
        filter.cspListITAssets === 'false'
      ) {
        criteriaAnd.push({
          cspListITAssets:
            filter.cspListITAssets === true ||
            filter.cspListITAssets === 'true',
        });
      }

      if (
        filter.cspJobRoleInfoSecTraining === true ||
        filter.cspJobRoleInfoSecTraining === 'true' ||
        filter.cspJobRoleInfoSecTraining === false ||
        filter.cspJobRoleInfoSecTraining === 'false'
      ) {
        criteriaAnd.push({
          cspJobRoleInfoSecTraining:
            filter.cspJobRoleInfoSecTraining === true ||
            filter.cspJobRoleInfoSecTraining === 'true',
        });
      }

      if (
        filter.cspIncidentMgmtPlan === true ||
        filter.cspIncidentMgmtPlan === 'true' ||
        filter.cspIncidentMgmtPlan === false ||
        filter.cspIncidentMgmtPlan === 'false'
      ) {
        criteriaAnd.push({
          cspIncidentMgmtPlan:
            filter.cspIncidentMgmtPlan === true ||
            filter.cspIncidentMgmtPlan === 'true',
        });
      }

      if (
        filter.cspIncidentVendorNotification === true ||
        filter.cspIncidentVendorNotification === 'true' ||
        filter.cspIncidentVendorNotification === false ||
        filter.cspIncidentVendorNotification === 'false'
      ) {
        criteriaAnd.push({
          cspIncidentVendorNotification:
            filter.cspIncidentVendorNotification === true ||
            filter.cspIncidentVendorNotification === 'true',
        });
      }

      if (
        filter.cspCyberInsurance === true ||
        filter.cspCyberInsurance === 'true' ||
        filter.cspCyberInsurance === false ||
        filter.cspCyberInsurance === 'false'
      ) {
        criteriaAnd.push({
          cspCyberInsurance:
            filter.cspCyberInsurance === true ||
            filter.cspCyberInsurance === 'true',
        });
      }

      if (
        filter.cspLatestCyberAwarenessThreats === true ||
        filter.cspLatestCyberAwarenessThreats === 'true' ||
        filter.cspLatestCyberAwarenessThreats === false ||
        filter.cspLatestCyberAwarenessThreats === 'false'
      ) {
        criteriaAnd.push({
          cspLatestCyberAwarenessThreats:
            filter.cspLatestCyberAwarenessThreats ===
              true ||
            filter.cspLatestCyberAwarenessThreats ===
              'true',
        });
      }

      if (
        filter.cspMFAUtilized === true ||
        filter.cspMFAUtilized === 'true' ||
        filter.cspMFAUtilized === false ||
        filter.cspMFAUtilized === 'false'
      ) {
        criteriaAnd.push({
          cspMFAUtilized:
            filter.cspMFAUtilized === true ||
            filter.cspMFAUtilized === 'true',
        });
      }

      if (
        filter.cspSecurityTesting === true ||
        filter.cspSecurityTesting === 'true' ||
        filter.cspSecurityTesting === false ||
        filter.cspSecurityTesting === 'false'
      ) {
        criteriaAnd.push({
          cspSecurityTesting:
            filter.cspSecurityTesting === true ||
            filter.cspSecurityTesting === 'true',
        });
      }

      if (
        filter.cspBackupStrategy === true ||
        filter.cspBackupStrategy === 'true' ||
        filter.cspBackupStrategy === false ||
        filter.cspBackupStrategy === 'false'
      ) {
        criteriaAnd.push({
          cspBackupStrategy:
            filter.cspBackupStrategy === true ||
            filter.cspBackupStrategy === 'true',
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

    let rows = await OrganizationProfile(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await OrganizationProfile(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(
        async (row) =>
          await this._mapRelationshipsAndFillDownloadUrl(
            row,
            options,
          ),
      ),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    search,
    limit,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenant: currentTenant.id,
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            companyName: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('companyName_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await OrganizationProfile(
      options.database,
    )
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.companyName,
    }));
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: OrganizationProfile(options.database)
          .modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(
    record,
    options: IRepositoryOptions,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    return output;
  }
}

export default OrganizationProfileRepository;
