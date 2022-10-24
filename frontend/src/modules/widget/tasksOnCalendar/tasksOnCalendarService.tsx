import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class TasksOnCalendarService {
  static async more(date, page, rpp = 5) {
    const tenantId = AuthCurrentTenant.get();

    const body = {
      date,
      page,
      rpp,
    };

    const response = await authAxios.put(
      `/tenant/${tenantId}/widget/tasks-on-calendar/more`,
      body,
    );

    return response.data;
  }

  static async search(start, end) {
    const tenantId = AuthCurrentTenant.get();

    const params = {
      start,
      end,
    };

    const response = await authAxios.get(
      `/tenant/${tenantId}/widget/tasks-on-calendar/search`,
      {
        params,
      },
    );

    return response.data;
  }

  static async move({ id, start }) {
    const tenantId = AuthCurrentTenant.get();

    const body = {
      id,
      start,
    };

    const response = await authAxios.put(
      `/tenant/${tenantId}/widget/tasks-on-calendar/move`,
      body,
    );

    return response.data;
  }
}
