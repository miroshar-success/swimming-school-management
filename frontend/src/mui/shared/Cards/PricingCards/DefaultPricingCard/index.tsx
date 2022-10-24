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

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import MDButton from 'src/mui/components/MDButton';

// Declaring props types for DefaultPricingCard
interface Props {
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark'
    | 'white';
  badge: {
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
  price: {
    currency: string;
    value: string;
    type: string;
  };
  specifications: {
    label: string;
    includes?: boolean;
  }[];
  action: {
    type: 'external' | 'internal';
    route: string;
    label: string;
    color:
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'light'
      | 'dark';
  };
  shadow?: boolean;
  [key: string]: any;
}

function DefaultPricingCard({
  color,
  badge,
  price,
  specifications,
  action,
  shadow,
}: Props): JSX.Element {
  const renderSpecifications = specifications.map(
    ({ label, includes }) => (
      <MDBox
        key={label}
        display="flex"
        alignItems="center"
        p={0.8}
      >
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="1.2rem"
          height="1.2rem"
          mr={1.6}
          mt={-0.125}
        >
          <MDTypography
            variant="body1"
            color={color === 'white' ? 'text' : 'white'}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{includes ? 'done' : 'remove'}</Icon>
          </MDTypography>
        </MDBox>
        <MDTypography
          variant="body2"
          color={color === 'white' ? 'text' : 'white'}
          fontWeight="regular"
        >
          {label}
        </MDTypography>
      </MDBox>
    ),
  );

  return (
    <Card
      sx={{
        boxShadow: ({ boxShadows: { lg } }) =>
          shadow ? lg : 'none',
      }}
    >
      <MDBox
        bgColor={color}
        variant={
          color === 'white' ? 'contained' : 'gradient'
        }
        borderRadius="xl"
      >
        <MDBox
          bgColor={badge.color}
          width="max-content"
          px={3.2}
          pt={0}
          pb={0.4}
          mx="auto"
          mt={-1.375}
          borderRadius="section"
          lineHeight={1}
        >
          <MDTypography
            variant="caption"
            textTransform="uppercase"
            fontWeight="medium"
            color={
              badge.color === 'light' ? 'dark' : 'white'
            }
          >
            {badge.label}
          </MDTypography>
        </MDBox>
        <MDBox
          pt={2.4}
          pb={1.6}
          px={1.6}
          textAlign="center"
        >
          <MDBox my={0.8}>
            <MDTypography
              variant="h1"
              color={color === 'white' ? 'dark' : 'white'}
            >
              <MDTypography
                display="inline"
                component="small"
                variant="h5"
                color="inherit"
                verticalAlign="top"
              >
                {price.currency}
              </MDTypography>
              {price.value}
              <MDTypography
                display="inline"
                component="small"
                variant="h5"
                color="inherit"
              >
                /{price.type}
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox pb={2.4} px={2.4}>
          {renderSpecifications}
          {action.type === 'internal' ? (
            <MDBox mt={2.4}>
              <MDButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color}
                fullWidth
              >
                {action.label}&nbsp;
                <Icon sx={{ fontWeight: 'bold' }}>
                  arrow_forward
                </Icon>
              </MDButton>
            </MDBox>
          ) : (
            <MDBox mt={2.4}>
              <MDButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color}
                fullWidth
              >
                {action.label}&nbsp;
                <Icon sx={{ fontWeight: 'bold' }}>
                  arrow_forward
                </Icon>
              </MDButton>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Declaring default props for DefaultPricingCard
DefaultPricingCard.defaultProps = {
  color: 'white',
  shadow: true,
};

export default DefaultPricingCard;
