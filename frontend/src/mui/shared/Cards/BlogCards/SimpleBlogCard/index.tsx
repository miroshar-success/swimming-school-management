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

// react-router components
import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import MuiLink from '@mui/material/Link';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import MDButton from 'src/mui/components/MDButton';

// Declaring props types for SimpleBlogCard
interface Props {
  image: string;
  title: string;
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
      | 'dark'
      | 'light'
      | 'default';
    label: string;
    [key: string]: any;
  };
}

function SimpleBlogCard({
  image,
  title,
  description,
  action,
}: Props): JSX.Element {
  return (
    <Card>
      <MDBox
        position="relative"
        borderRadius="lg"
        mt={-3}
        mx={1.6}
      >
        <MDBox
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="relative"
          zIndex={1}
        />
        <MDBox
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top="3%"
          sx={{
            backgroundImage: `url(${image})`,
            transform: 'scale(0.94)',
            filter: 'blur(9.6px)',
            backgroundSize: 'cover',
          }}
        />
      </MDBox>
      <MDBox p={2.4}>
        <MDTypography
          display="inline"
          variant="h3"
          textTransform="capitalize"
          fontWeight="bold"
        >
          {title}
        </MDTypography>
        <MDBox mt={1.6} mb={2.4}>
          <MDTypography
            variant="body2"
            component="p"
            color="text"
          >
            {description}
          </MDTypography>
        </MDBox>
        {action.type === 'external' ? (
          <MuiLink
            href={action.route}
            target="_blank"
            rel="noreferrer"
          >
            <MDButton
              color={action.color ? action.color : 'dark'}
            >
              {action.label}
            </MDButton>
          </MuiLink>
        ) : (
          <Link to={action.route}>
            <MDButton
              color={action.color ? action.color : 'dark'}
            >
              {action.label}
            </MDButton>
          </Link>
        )}
      </MDBox>
    </Card>
  );
}

export default SimpleBlogCard;
