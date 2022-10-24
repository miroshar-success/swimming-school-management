import MongooseRepository from '../database/repositories/mongooseRepository';
import MuiRepository from '../database/repositories/muiRepository';

const DEFAULT_SETTINGS = {
  miniSidenav: false,
  transparentSidenav: false,
  whiteSidenav: false,
  sidenavColor: 'info',
  transparentNavbar: true,
  fixedNavbar: true,
  direction: 'ltr',
  darkMode: false,
  viewModes: [],
};

class MuiService {
  static async findOrCreateDefault(options) {
    return MuiRepository.findOrCreateDefault(
      DEFAULT_SETTINGS,
      options,
    );
  }

  static async save(data, options) {
    const session = await MongooseRepository.createSession(
      options.database,
    );

    const settings = await MuiRepository.save(
      data,
      options,
    );

    await MongooseRepository.commitTransaction(session);

    return settings;
  }
}

export default MuiService;
