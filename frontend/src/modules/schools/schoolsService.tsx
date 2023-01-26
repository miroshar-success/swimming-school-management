import authAxios from 'src/modules/shared/axios/authAxios';

export default class SchoolsService {
  static async find(id) {
    const response = await authAxios.get(`/schools/${id}`);

    return response.data;
  }

  static async list(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const response = await authAxios.get(`/schools`, {
      params,
    });

    return response.data;
  }

  static async create(data) {
    const body = {
      ...data,
      invitationToken: '',
      roles: ['student'],
    };

    const response = await authAxios.post(
      `/auth/sign-up`,
      body,
    );

    return response.data;
  }
}
