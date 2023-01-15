import ApiResponseHandler from '../apiResponseHandler';
import SettingsService from '../../services/settingsService';

export default async (req, res, next) => {
  try {
    const payload = await SettingsService.findAndCountAll(
      req.query,
      req,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
