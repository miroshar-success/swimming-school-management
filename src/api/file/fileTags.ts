import ApiResponseHandler from '../apiResponseHandler';
import FileService from '../../services/fileService';

export default async (req, res, next) => {
  try {
    const payload = await new FileService(req).tags(
      req.params.id,
      req.body.data,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
