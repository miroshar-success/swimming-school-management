import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class AttendanceService {
  static async create(id, lessonId) {
    const body = {
      lessonId,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/attendance/${id}`,
      body,
    );

    return response.data;
  }

  static async find(id) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/attendance/${id}`,
    );

    return response.data;
  }

  static async list(filter) {
    const params = {
      filter,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/attendance`,
      {
        params,
      },
    );

    return response.data;
  }
}
