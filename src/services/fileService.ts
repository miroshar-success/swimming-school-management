import { IServiceOptions } from './IServiceOptions';
import Error404 from '../errors/Error404';
import File from '../database/models/file';
import FileRepository from '../database/repositories/fileRepository';
import MongooseRepository from '../database/repositories/mongooseRepository';
import TagRefService from './tagRefService';
import TagRepository from '../database/repositories/tagRepository';
import UserRepository from '../database/repositories/userRepository';

export default class FileService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.uploader = await UserRepository.filterIdInTenant(
        data.uploader,
        { ...this.options, session },
      );
      data.tags = await TagRepository.filterIdsInTenant(
        (data.tags || []).map((tag) => tag.id),
        { ...this.options, session },
      );

      const record = FileRepository.create(data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'file',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.uploader = await UserRepository.filterIdInTenant(
        data.uploader,
        { ...this.options, session },
      );
      data.tags = await TagRepository.filterIdsInTenant(
        (data.tags || []).map((tag) => tag.id),
        { ...this.options, session },
      );

      const record = FileRepository.create(data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'file',
      );

      throw error;
    }
  }

  async tags(id, data) {
    const dbId = await FileRepository.filterIdInTenant(
      id,
      this.options,
    );

    if (!dbId) {
      throw new Error404();
    }

    await new TagRefService(this.options).save(
      File,
      dbId,
      data.tags,
    );

    return dbId;
  }

  async findById(id) {
    return await FileRepository.findById(id, this.options);
  }

  async findAndCountAll(args) {
    // return await FileRepository.findAndCountAll(
    //   args,
    //   this.options,
    // );
  }
}
