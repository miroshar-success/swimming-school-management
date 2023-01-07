import ApiResponseHandler from '../../apiResponseHandler';
import PermissionChecker from '../../../services/user/permissionChecker';
import Permissions from '../../../security/permissions';
import LessonsOnCalendarService from '../../../services/widget/lessonsOnCalendarService';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.lessonRead,
    );

    const payload = await new LessonsOnCalendarService(
      req,
    ).search();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
