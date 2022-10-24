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

import { ReactNode } from 'react';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Declaring props types for CategoriesList
interface Props {
  title: string;
  categories: {
    color?:
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'light'
      | 'dark';
    icon: ReactNode | string;
    name: string;
    description: ReactNode;
    route: string;
  }[];
  [key: string]: any;
}

function CategoriesList({
  title,
  categories,
}: Props): JSX.Element {
  const renderItems = categories.map(
    ({ color, icon, name, description, route }, key) => (
      <MDBox
        key={name}
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderRadius="lg"
        py={0.8}
        pr={1.6}
        mb={categories.length - 1 === key ? 0 : 1}
      >
        <MDBox display="flex" alignItems="center">
          <MDBox
            display="grid"
            alignItems="center"
            justifyContent="center"
            bgColor={color}
            borderRadius="lg"
            shadow="md"
            color="white"
            width="1.6rem"
            height="1.6rem"
            mr={1.6}
            variant="gradient"
            fontSize="0.7rem"
          >
            <Icon
              sx={{
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {icon}
            </Icon>
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            <MDTypography
              variant="button"
              color={color}
              fontWeight="medium"
              gutterBottom
            >
              {name}
            </MDTypography>
            <MDTypography variant="caption" color="text">
              {description}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex">
          <MDTypography
            component={Link}
            variant="button"
            color={color}
            to={route}
            sx={{
              lineHeight: 0,
              transition:
                'all 0.2s cubic-bezier(.34,1.61,.7,1.3)',
              p: 0.5,

              '&:hover, &:focus': {
                transform: 'translateX(4px)',
              },
            }}
          >
            <Icon sx={{ fontWeight: 'bold' }}>
              chevron_right
            </Icon>
          </MDTypography>
        </MDBox>
      </MDBox>
    ),
  );

  return (
    <Card>
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
          {renderItems}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default CategoriesList;
