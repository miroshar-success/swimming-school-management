import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class LessonsOnCalendarService {
  static async more(date, page, rpp = 5) {
    const tenantId = AuthCurrentTenant.get();

    const body = {
      date,
      page,
      rpp,
    };

    const response = await authAxios.put(
      `/tenant/${tenantId}/widget/lessons-on-calendar/more`,
      body,
    );

    return response.data;
  }

  static async search() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/widget/lessons-on-calendar/search`,
    );

    return response.data;
  }
}
