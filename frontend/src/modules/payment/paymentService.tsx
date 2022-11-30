import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class PaymentService {
  static async create(id, data) {
    const body = {
      id,
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/payment/${id}`,
      body,
    );

    return response.data;
  }

  static async destroyAll(userId, paymentIds) {
    const params = {
      userId,
      paymentIds,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.delete(
      `/tenant/${tenantId}/payment`,
      {
        params,
      },
    );

    return response.data;
  }
}
