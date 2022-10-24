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
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import MDButton from 'src/mui/components/MDButton';
import MDAvatar from 'src/mui/components/MDAvatar';

// Declaring props types for DefaultProjectCard
interface Props {
  image: string;
  label: string;
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
      | 'light'
      | 'dark'
      | 'white';
    label: string;
  };
  authors?: {
    image: string;
    name: string;
  }[];
  [key: string]: any;
}

function DefaultProjectCard({
  image,
  label,
  title,
  description,
  action,
  authors,
}: Props): JSX.Element {
  const renderAuthors = authors.map(
    ({ image: media, name }) => (
      <Tooltip key={name} title={name} placement="bottom">
        <MDAvatar
          src={media}
          alt={name}
          size="xs"
          sx={({
            borders: { borderWidth },
            palette: { white },
          }) => ({
            border: `${borderWidth[2]} solid ${white.main}`,
            cursor: 'pointer',
            position: 'relative',
            ml: -1.25,

            '&:hover, &:focus': {
              zIndex: '10',
            },
          })}
        />
      </Tooltip>
    ),
  );

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        overflow: 'visible',
      }}
    >
      <MDBox
        position="relative"
        width="100.25%"
        shadow="xl"
        borderRadius="xl"
      >
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: '100%',
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </MDBox>
      <MDBox mt={0.8} mx={0.4}>
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="text"
          textTransform="capitalize"
        >
          {label}
        </MDTypography>
        <MDBox mb={0.8}>
          {action.type === 'internal' ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          )}
        </MDBox>
        <MDBox mb={2.4} lineHeight={0}>
          <MDTypography
            variant="button"
            fontWeight="light"
            color="text"
          >
            {description}
          </MDTypography>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {action.type === 'internal' ? (
            <MDButton
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          ) : (
            <MDButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          )}
          <MDBox display="flex">{renderAuthors}</MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Declaring default props for DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

export default DefaultProjectCard;
