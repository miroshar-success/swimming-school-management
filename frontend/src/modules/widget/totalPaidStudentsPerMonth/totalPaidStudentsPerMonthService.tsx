import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class TotalPaidStudentsPerMonthService {
  static async list() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/widget/payments-for-statistics/totalPaidStudents`,
    );

    return response.data;
  }
}
