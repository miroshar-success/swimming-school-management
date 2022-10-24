import assert from 'assert';
import UserRepository from '../../database/repositories/userRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import { IServiceOptions } from '../IServiceOptions';
import FileRepository from '../../database/repositories/fileRepository';

export default class AuthProfileEditor {
  options: IServiceOptions;
  session;
  data;

  constructor(options) {
    this.options = options;
    this.session = null;
  }

  async execute(data) {
    this.data = data;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession(
        this.options.database,
      );

      this.data.avatars =
        await FileRepository.filterIdsInTenant(
          data.avatars,
          { ...this.options, session: this.session },
        );

      await UserRepository.updateProfile(
        this.options.currentUser.id,
        this.data,
        {
          ...this.options,
          bypassPermissionValidation: true,
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

  async _validate() {
    assert(
      this.options.currentUser,
      'currentUser is required',
    );
    assert(
      this.options.currentUser.id,
      'currentUser.id is required',
    );
    assert(
      this.options.currentUser.email,
      'currentUser.email is required',
    );

    assert(this.data, 'profile is required');
  }
}
