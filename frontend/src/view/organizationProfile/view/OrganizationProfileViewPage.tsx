import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/organizationProfile/view/organizationProfileViewActions';
import selectors from 'src/modules/organizationProfile/view/organizationProfileViewSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import OrganizationProfileView from 'src/view/organizationProfile/view/OrganizationProfileView';
import OrganizationProfileViewToolbar from 'src/view/organizationProfile/view/OrganizationProfileViewToolbar';
import Spinner from 'src/view/shared/Spinner';

function OrganizationProfilePage() {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);
  const [dispatched, setDispatched] = useState(false);

  const id = record?.id ?? null;

  useEffect(() => {
    dispatch(actions.doFind());
    setDispatched(true);
  }, [dispatch]);

  return !dispatched || loading ? (
    <Spinner />
  ) : (
    <>
      <Card>
        <MDBox p={2.4}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {i18n(
                'entities.organizationProfile.view.title',
              )}
            </MDTypography>

            <OrganizationProfileViewToolbar id={id} />
          </MDBox>
        </MDBox>
      </Card>

      <OrganizationProfileView
        loading={loading}
        record={record}
      />
    </>
  );
}

export default OrganizationProfilePage;
