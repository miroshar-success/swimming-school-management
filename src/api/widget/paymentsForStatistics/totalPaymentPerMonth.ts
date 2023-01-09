import ApiResponseHandler from '../../apiResponseHandler';
import PermissionChecker from '../../../services/user/permissionChecker';
import Permissions from '../../../security/permissions';
import PaymentsForStatisticsService from '../../../services/widget/paymentsForStatisticsService';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.paymentRead,
    );

    const payload = await new PaymentsForStatisticsService(
      req,
    ).totalPaymentPerMonth();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
