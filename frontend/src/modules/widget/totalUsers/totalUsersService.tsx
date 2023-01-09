import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class TotalUsersService {
  static async totalStudents() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/widget/students-for-statistics/totalStudents`,
    );

    return response.data;
  }

  static async totalTeachers() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/widget/students-for-statistics/totalTeachers`,
    );

    return response.data;
  }

  static async totalManagers() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/widget/students-for-statistics/totalManagers`,
    );

    return response.data;
  }

  static async totalUsers() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/widget/students-for-statistics/totalUsers`,
    );

    return response.data;
  }
}
