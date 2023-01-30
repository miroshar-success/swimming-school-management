import { i18n } from 'src/i18n';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StudentAreaLayout from 'src/view/home/layout/studentAreaLayout';
import authSelectors from 'src/modules/auth/authSelectors';
import authActions from 'src/modules/auth/authActions';
import muiActions from 'src/modules/mui/muiActions';
import Header from 'src/view/home/layout/Header';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';
import { Card } from '@mui/material';
import Spinner from 'src/view/shared/Spinner';

export default function Dashboard(props) {
  const dispatch = useDispatch();
  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );

  const loading = useSelector(authSelectors.selectLoading);

  return (
    <>
      <Header />
      <StudentAreaLayout>
        {loading && (
          <MDBox display="flex" justifyContent="center">
            <Spinner />
          </MDBox>
        )}
        {!loading && (
          <MDBox>
            <Card>
              <MDBox p={2.4}>
                <MDBox display="flex" pb={2}>
                  <MDTypography
                    variant="h4"
                    fontWeight="regular"
                    sx={{
                      pt: 0.6,
                    }}
                  >
                    {`${i18n('student.hello')}`}
                  </MDTypography>
                  <MDTypography
                    variant="h3"
                    sx={{
                      px: 1,
                    }}
                  >
                    {userText}
                  </MDTypography>
                </MDBox>
                <MDTypography
                  variant="h4"
                  fontWeight="regular"
                >
                  {i18n('student.dashboard.greeting')}
                </MDTypography>
              </MDBox>
            </Card>
          </MDBox>
        )}
      </StudentAreaLayout>
    </>
  );
}
