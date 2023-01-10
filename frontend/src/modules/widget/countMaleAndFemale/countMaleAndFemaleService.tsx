import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class CountMaleAndFemaleService {
  static async getCountMaleAndFemale() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/widget/students-for-statistics/countMaleAndFemale`,
    );

    return response.data;
  }
}
