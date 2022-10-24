import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import TaskService from '../../services/taskService';
import moment from 'moment';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.taskEdit,
    );

    if (
      req.body.data.completedDate &&
      req.body.data.status !== 'Complete'
    ) {
      req.body.data.completedDate = null;
    }

    if (
      !req.body.data.completedDate &&
      req.body.data.status === 'Complete'
    ) {
      req.body.data.completedDate = moment();
    }

    const payload = await new TaskService(req).update(
      req.params.id,
      req.body.data,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
