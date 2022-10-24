import { getConfig } from '../../config';
import { IServiceOptions } from '../IServiceOptions';
import Axios from 'axios';
import Error400 from '../../errors/Error400';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TenantRepository from '../../database/repositories/tenantRepository';

const axios = Axios.create({
  baseURL: getConfig().TYPE_FORM_URL,
});

axios.interceptors.request.use(
  async function (options: any) {
    options.headers['Authorization'] = `Bearer ${
      getConfig().TYPE_FORM_API_TOKEN
    }`;
    return options;
  },
  function (error) {
    console.log('Request error: ', error);
    return Promise.reject(error);
  },
);

export default class AuthAnswer {
  options: IServiceOptions;
  session;

  constructor(options) {
    this.options = options;
    this.session = null;
  }

  throwNotFound(responseId = null) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(this.options);
    throw new Error400(
      currentTenant.language,
      'entities.typeForm.errors.responseNotFound',
      responseId,
    );
  }

  async destroyTypeFormData(responseId) {
    if (!responseId) {
      this.throwNotFound(responseId);
    }

    const response = await axios.delete(
      `/forms/${
        getConfig().TYPE_FORM_ID
      }/responses?included_response_ids=${responseId}`,
    );

    return response.data;
  }

  async findTypeFormData(responseId) {
    if (!responseId) {
      this.throwNotFound(responseId);
    }

    const response = await axios.get(
      `/forms/${
        getConfig().TYPE_FORM_ID
      }/responses?included_response_ids=${responseId}`,
    );

    return response.data;
  }

  async execute(responseId, doDestroy = false) {
    this.session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      if (!doDestroy) {
        const data = await this.findTypeFormData(
          responseId,
        );

        if (!data.total_items) {
          this.throwNotFound(responseId);
        }
      } else {
        await this.destroyTypeFormData(responseId);
      }

      const currentTenant =
        MongooseRepository.getCurrentTenant(this.options);

      const session = this.session;

      await TenantRepository.update(
        currentTenant.id,
        { typeFormId: doDestroy ? null : responseId },
        {
          ...this.options,
          session,
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

    return responseId;
  }
}
