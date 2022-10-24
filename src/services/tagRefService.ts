import { IServiceOptions } from './IServiceOptions';
import MongooseRepository from '../database/repositories/mongooseRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';

export default class TagRefService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async save(entity, entityId, tags) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const result = await TagRefRepository.save(
        entity,
        null,
        entityId,
        tags,
        { ...this.options, session },
      );

      await MongooseRepository.commitTransaction(session);

      return result;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'tagRef',
      );

      throw error;
    }
  }
}
