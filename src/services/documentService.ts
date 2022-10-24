import { IServiceOptions } from './IServiceOptions';
import Document from '../database/models/file';
import DocumentRepository from '../database/repositories/documentRepository';
import MongooseRepository from '../database/repositories/mongooseRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';
import FileRepository from '../database/repositories/fileRepository';

export default class DocumentService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async save(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const files = await FileRepository.filterIdsInTenant(
        data.files,
        { ...this.options, session },
      );

      await FileRepository.assignRelatedData(
        files,
        {
          type: FileRepository.TYPE_INTERNAL,
          typeId: null,
          typeTitle: null,
        },
        { ...this.options, session },
      );

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'document',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record = await DocumentRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        Document,
        null,
        record.id,
        data.tags,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'document',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await DocumentRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findAndCountAll(args) {
    return await DocumentRepository.findAndCountAll(
      args,
      this.options,
    );
  }
}
