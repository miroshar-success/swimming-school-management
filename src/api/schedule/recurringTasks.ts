import ApiResponseHandler from '../apiResponseHandler';
import RecurringTasksService from '../../services/schedule/recurringTasksService';

export default async (req, res, next) => {
  try {
    const payload = await new RecurringTasksService(
      req,
    ).recurring();
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
