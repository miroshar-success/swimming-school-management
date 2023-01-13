import { ReactNode } from 'react';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Declaring props types for SimpleNavbarDropdown
interface Props {
  name: string;
  icon?: ReactNode;
  children?: ReactNode;
  collapseStatus?: boolean;
  light?: boolean;
  href?: string;
  route?: string;
  collapse: boolean;
  [key: string]: any;
}

function SimpleNavbarDropdown({
  name,
  icon,
  children,
  collapseStatus,
  light,
  href,
  route,
  collapse,
  ...rest
}: Props): JSX.Element {
  const linkComponent = {
    component: 'a',
    href,
    target: '_blank',
    rel: 'noreferrer',
  };

  const routeComponent: any = {
    component: Link,
    to: route,
  };

  return (
    <>
      <MDBox
        {...rest}
        mx={0.8}
        p={0.8}
        display="flex"
        alignItems="baseline"
        color={light ? 'white' : 'dark'}
        opacity={light ? 1 : 0.6}
        sx={{ cursor: 'pointer', userSelect: 'none' }}
        {...(route && routeComponent)}
        {...(href && linkComponent)}
      >
        <MDTypography
          variant="h4"
          lineHeight={1}
          color="inherit"
          sx={{
            alignSelf: 'center',
            '& *': { verticalAlign: 'middle' },
          }}
        >
          {icon}
        </MDTypography>
        <MDTypography
          variant="h4"
          fontWeight="medium"
          textTransform="capitalize"
          color={light ? 'white' : 'dark'}
          sx={{ fontWeight: '100%', ml: 1, mr: 0.25 }}
        >
          {name}
        </MDTypography>
        <MDTypography
          variant="body2"
          color={light ? 'white' : 'dark'}
          ml="auto"
        >
          <Icon
            sx={{
              fontWeight: 'normal',
              verticalAlign: 'middle',
            }}
          >
            {collapse && 'keyboard_arrow_down'}
          </Icon>
        </MDTypography>
      </MDBox>
      {children && (
        <Collapse
          in={Boolean(collapseStatus)}
          timeout={400}
          unmountOnExit
        >
          {children}
        </Collapse>
      )}
    </>
  );
}

// Declaring default props for SimpleNavbarDropdown
SimpleNavbarDropdown.defaultProps = {
  icon: false,
  children: false,
  collapseStatus: false,
  light: false,
  href: '',
  route: '',
};

export default SimpleNavbarDropdown;
