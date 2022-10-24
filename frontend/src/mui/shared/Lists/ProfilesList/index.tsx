/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import MDAvatar from 'src/mui/components/MDAvatar';
import MDButton from 'src/mui/components/MDButton';

// Declaring props types for ProfilesList
interface Props {
  title: string;
  profiles: {
    image: string;
    name: string;
    description: string;
    action: {
      type: 'external' | 'internal';
      route: string;
      color:
        | 'primary'
        | 'secondary'
        | 'info'
        | 'success'
        | 'warning'
        | 'error'
        | 'light'
        | 'dark';
      label: string;
    };
  }[];
  shadow?: boolean;
  [key: string]: any;
}

function ProfilesList({
  title,
  profiles,
  shadow,
}: Props): JSX.Element {
  const renderProfiles = profiles.map(
    ({ image, name, description, action }) => (
      <MDBox
        key={name}
        component="li"
        display="flex"
        alignItems="center"
        py={0.8}
        mb={0.8}
      >
        <MDBox mr={1.6}>
          <MDAvatar
            src={image}
            alt="something here"
            shadow="md"
          />
        </MDBox>
        <MDBox
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <MDTypography
            variant="button"
            fontWeight="medium"
          >
            {name}
          </MDTypography>
          <MDTypography variant="caption" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox ml="auto">
          {action.type === 'internal' ? (
            <MDButton
              component={Link}
              to={action.route}
              variant="text"
              color="info"
            >
              {action.label}
            </MDButton>
          ) : (
            <MDButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="text"
              color={action.color}
            >
              {action.label}
            </MDButton>
          )}
        </MDBox>
      </MDBox>
    ),
  );

  return (
    <Card
      sx={{ height: '100%', boxShadow: !shadow && 'none' }}
    >
      <MDBox pt={1.6} px={1.6}>
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={1.6}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
        >
          {renderProfiles}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Declaring defualt props for ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

export default ProfilesList;
