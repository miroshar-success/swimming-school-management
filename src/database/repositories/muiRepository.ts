import MongooseRepository from './mongooseRepository';
import MUI from '../models/mui';
import AuditLogRepository from './auditLogRepository';
import { IRepositoryOptions } from './IRepositoryOptions';

export default class MuiRepository {
  static async find(options: IRepositoryOptions) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    return await MongooseRepository.wrapWithSessionIfExists(
      MUI(options.database).findOne({
        user: currentUser.id,
      }),
      options,
    );
  }

  static async findOrCreateDefault(
    defaults,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const first =
      await MongooseRepository.wrapWithSessionIfExists(
        MUI(options.database).findOne({
          user: currentUser.id,
        }),
        options,
      );

    if (first) {
      return first;
    }

    const [mui] = await MUI(options.database).create(
      [
        {
          ...defaults,
          user: currentUser.id,
          createdBy: MongooseRepository.getCurrentUser(
            options,
          )
            ? MongooseRepository.getCurrentUser(options).id
            : null,
        },
      ],
      options,
    );

    return mui;
  }

  static async save(data, options: IRepositoryOptions) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        MUI(options.database).findOne({
          user: currentUser.id,
        }),
        options,
      );

    await MUI(options.database).updateOne(
      { _id: record.id },
      { ...data, user: currentUser.id },
      options,
    );

    // await AuditLogRepository.log(
    //   {
    //     entityName: 'mui',
    //     entityId: record.id,
    //     action: AuditLogRepository.UPDATE,
    //     values: data,
    //   },
    //   options,
    // );

    return await MongooseRepository.wrapWithSessionIfExists(
      MUI(options.database).findById(record.id),
      options,
    );
  }
}
