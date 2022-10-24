import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class TasksByMonthService {
  static async totalAmounts() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/widget/tasks-by-month/total-amounts`,
    );

    return response.data;
  }

  static async lineChartDatasets() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/widget/tasks-by-month/line-chart-datasets`,
    );

    return response.data;
  }
}
