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
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme/base/colors';
import typography from 'src/mui/assets/theme/base/typography';

// Declaring props types for ProfileInfoCard
interface Props {
  title: string;
  description: string;
  info: {
    [key: string]: string;
  };
  social: {
    [key: string]: any;
  }[];
  action: {
    route: string;
    tooltip: string;
  };
  shadow?: boolean;
  [key: string]: any;
}

function ProfileInfoCard({
  title,
  description,
  info,
  social,
  action,
  shadow,
}: Props): JSX.Element {
  const labels: string[] = [];
  const values: string[] = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) =>
        i.match(/[A-Z]+/),
      );
      const newElement = el.replace(
        uppercaseLetter,
        ` ${uppercaseLetter.toLowerCase()}`,
      );

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={0.8} pr={1.6}>
      <MDTypography
        variant="button"
        fontWeight="bold"
        textTransform="capitalize"
      >
        {label}: &nbsp;
      </MDTypography>
      <MDTypography
        variant="button"
        fontWeight="regular"
        color="text"
      >
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  // Render the card social media icons
  const renderSocial = social.map(
    ({ link, icon, color }) => (
      <MDBox
        key={color}
        component="a"
        href={link}
        target="_blank"
        rel="noreferrer"
        fontSize={size.lg}
        color={socialMediaColors[color].main}
        pr={0.8}
        pl={0.4}
        lineHeight={1}
      >
        {icon}
      </MDBox>
    ),
  );

  return (
    <Card
      sx={{ height: '100%', boxShadow: !shadow && 'none' }}
    >
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={1.6}
        px={1.6}
      >
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {title}
        </MDTypography>
        <MDTypography
          component={Link}
          to={action.route}
          variant="body2"
          color="secondary"
        >
          <Tooltip title={action.tooltip} placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </MDTypography>
      </MDBox>
      <MDBox p={1.6}>
        <MDBox mb={1.6} lineHeight={1}>
          <MDTypography
            variant="button"
            color="text"
            fontWeight="light"
          >
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          {renderItems}
          <MDBox display="flex" py={0.8} pr={1.6}>
            <MDTypography
              variant="button"
              fontWeight="bold"
              textTransform="capitalize"
            >
              social: &nbsp;
            </MDTypography>
            {renderSocial}
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Declaring default props for ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

export default ProfileInfoCard;
