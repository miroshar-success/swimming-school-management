import ApiResponseHandler from '../../apiResponseHandler';
import PermissionChecker from '../../../services/user/permissionChecker';
import Permissions from '../../../security/permissions';
import TasksOnCalendarService from '../../../services/widget/tasksOnCalendarService';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.taskRead,
    );

    const payload = await new TasksOnCalendarService(
      req,
    ).moreByTaskInstance(req.body);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
