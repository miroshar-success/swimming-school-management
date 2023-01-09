import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class TotalNewStudentsPerMonthService {
  static async list() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/widget/students-for-statistics/totalNewStudents`,
    );

    return response.data;
  }
}
