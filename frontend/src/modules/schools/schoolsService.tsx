import authAxios from 'src/modules/shared/axios/authAxios';

export default class SchoolsService {
  static async find(id) {
    const response = await authAxios.get(
      `/tenant/schools/${id}`,
    );

    return response.data;
  }

  static async list(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const response = await authAxios.get(
      `/tenant/schools`,
      {
        params,
      },
    );

    return response.data;
  }
}
