import { useLocation } from 'react-router-dom';
import Breadcrumbs from 'src/mui/shared/Breadcrumbs';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

export default function BreadCrumbs(props) {
  const route = useLocation().pathname.split('/').slice(1);
  console.log(route);
  return (
    <>
      <Card>
        <MDBox p={2.4} my={2.4}>
          <MDTypography>
            <BreadCrumbs
              icon="home"
              title={route[route.length - 1]}
              route={route}
            />
          </MDTypography>
        </MDBox>
      </Card>
    </>
  );
}
