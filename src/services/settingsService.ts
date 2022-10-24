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

    const settings = await SettingsRepository.save(
      data,
      options,
    );

    await MongooseRepository.commitTransaction(session);

    return settings;
  }
}

export default SettingsService;
