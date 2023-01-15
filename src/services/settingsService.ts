import FileRepository from '../database/repositories/fileRepository';
import MongooseRepository from '../database/repositories/mongooseRepository';
import SettingsRepository from '../database/repositories/settingsRepository';

const DEFAULT_SETTINGS = {
  theme: 'default',
};

class SettingsService {
  static async findOrCreateDefault(options) {
    return SettingsRepository.findOrCreateDefault(
      DEFAULT_SETTINGS,
      options,
    );
  }

  static async save(data, options) {
    const session = await MongooseRepository.createSession(
      options.database,
    );

    data.logos = await FileRepository.filterIdsInTenant(
      data.logos,
      { ...options, session },
    );

    data.backgroundImages =
      await FileRepository.filterIdsInTenant(
        data.backgroundImages,
        { ...options, session },
      );

    data.photographs =
      await FileRepository.filterIdsInTenant(
        data.photographs,
        { ...options, session },
      );

    const settings = await SettingsRepository.save(
      data,
      options,
    );

    await MongooseRepository.commitTransaction(session);

    return settings;
  }

  static async findById(id, options) {
    const session = MongooseRepository.createSession(
      options.database,
    );

    try {
      const school = await SettingsRepository.findById(
        id,
        options,
      );

      await MongooseRepository.commitTransaction(session);

      return school;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  static async findAndCountAll(args, options) {
    const session = MongooseRepository.createSession(
      options.database,
    );

    try {
      const school =
        await SettingsRepository.findAndCountAll(
          args,
          options,
        );

      await MongooseRepository.commitTransaction(session);

      return school;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }
}

export default SettingsService;
