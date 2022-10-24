import ApiResponseHandler from '../apiResponseHandler';
import AuthAnswer from '../../services/auth/authAnswer';
import Error403 from '../../errors/Error403';

export default async (req, res, next) => {
  try {
    if (!req.currentUser || !req.currentUser.id) {
      throw new Error403(req.language);
    }

    const service = new AuthAnswer(req);

    const payload = await service.execute(
      req.params.responseId,
      true,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
