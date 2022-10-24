import { Card } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import Spinner from 'src/view/shared/Spinner';
import QuizForm from 'src/view/widgets/TypeForm/QuizForm';

function TypeForm() {
  const dispatch = useDispatch();

  const loading = useSelector(
    authSelectors.selectLoadingAnswerData,
  );
  const answerData = useSelector(
    authSelectors.selectCurrentAnswerData,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );

  const hanldeDestroyAnswerData = () => {
    dispatch(
      authActions.doDestroyAnswerData(
        currentTenant.typeFormId,
      ),
    );
  };

  useEffect(() => {
    if (!answerData && currentTenant.typeFormId) {
      dispatch(
        authActions.doFetchAnswerData(
          currentTenant.typeFormId,
        ),
      );
    }
  }, [dispatch, permissionChecker.needsAnswers]);

  if (permissionChecker.needsAnswers) {
    return null;
  }

  return (
    <Card>
      <MDBox pt={2.4} px={1.6}>
        <MDTypography variant="h6" fontWeight="medium">
          TypeForm
        </MDTypography>
      </MDBox>
      <MDBox p={1.6}>
        {loading && <Spinner />}
        {!loading && answerData && (
          <>
            <MDBox
              display="flex"
              alignItems="center"
              gap={1.6}
            >
              <ColorBadge
                label={`Score: ${answerData.items[0]?.calculated?.score}`}
              />
              <MDButton
                variant="outlined"
                color="error"
                onClick={hanldeDestroyAnswerData}
              >
                {i18n('common.destroy')}
              </MDButton>
            </MDBox>
          </>
        )}
      </MDBox>
    </Card>
  );
}

export default TypeForm;
