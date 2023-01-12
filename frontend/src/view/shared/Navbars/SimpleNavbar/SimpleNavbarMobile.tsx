import { useState } from 'react';

// react-router components
import { Link } from 'react-router-dom';

// @mui material components
import Collapse from '@mui/material/Collapse';
import MuiLink from '@mui/material/Link';
import { Theme } from '@mui/material/styles';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Newly defined components
import SimpleNavbarDropdown from 'src/view/shared/Navbars/SimpleNavbar/SimpleNavbarDropdown';

// Declaring props types for SimpleNavbarMobile
interface Props {
  routes: any;
  open: any;
}

function SimpleNavbarMobile({
  routes,
  open,
}: Props): JSX.Element {
  const [collapse, setCollapse] = useState<
    string | boolean
  >('');

  const handleSetCollapse = (name: string) =>
    collapse === name
      ? setCollapse(false)
      : setCollapse(name);

  const renderNavbarItems = routes.map(
    ({
      name,
      icon,
      collapse: routeCollapses,
      href,
      route,
      collapse: navCollapse,
    }: any) => (
      <SimpleNavbarDropdown
        key={name}
        name={name}
        icon={icon}
        collapseStatus={name === collapse}
        onClick={() => handleSetCollapse(name)}
        href={href}
        route={route}
        collapse={Boolean(navCollapse)}
      >
        <MDBox
          sx={{
            height: '12rem',
            maxHeight: '12rem',
            overflowY: 'scroll',
          }}
        >
          {routeCollapses &&
            routeCollapses.map((item: any) => (
              <MDBox key={item.name} px={1.6}>
                {item.collapse ? (
                  <>
                    <MDTypography
                      display="block"
                      variant="button"
                      fontWeight="bold"
                      textTransform="capitalize"
                      py={0.8}
                      px={0.4}
                    >
                      {item.name}
                    </MDTypography>
                    {item.collapse.map((el: any) => (
                      <MDTypography
                        key={el.name}
                        component={
                          el.route ? Link : MuiLink
                        }
                        to={el.route ? el.route : ''}
                        href={el.href ? el.href : ''}
                        target={el.href ? '_blank' : ''}
                        rel={
                          el.href
                            ? 'noreferrer'
                            : 'noreferrer'
                        }
                        minWidth="9rem"
                        display="block"
                        variant="button"
                        color="text"
                        textTransform="capitalize"
                        fontWeight="regular"
                        py={0.5}
                        px={1.6}
                        sx={({
                          palette: { grey, dark },
                          borders: { borderRadius },
                        }: Theme) => ({
                          borderRadius: borderRadius.md,
                          cursor: 'pointer',
                          transition: 'all 300ms linear',

                          '&:hover': {
                            backgroundColor: grey[200],
                            color: dark.main,
                          },
                        })}
                      >
                        {el.name}
                      </MDTypography>
                    ))}
                  </>
                ) : (
                  <MDBox
                    key={item.key}
                    display="block"
                    component={item.route ? Link : MuiLink}
                    to={item.route ? item.route : ''}
                    href={item.href ? item.href : ''}
                    target={item.href ? '_blank' : ''}
                    rel={
                      item.href
                        ? 'noreferrer'
                        : 'noreferrer'
                    }
                    sx={({
                      palette: { grey, dark },
                      borders: { borderRadius },
                    }) => ({
                      borderRadius: borderRadius.md,
                      cursor: 'pointer',
                      transition: 'all 300ms linear',
                      py: 1,
                      px: 1.625,

                      '&:hover': {
                        backgroundColor: grey[200],
                        color: dark.main,

                        '& *': {
                          color: dark.main,
                        },
                      },
                    })}
                  >
                    <MDTypography
                      display="block"
                      variant="button"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      {item.name}
                    </MDTypography>
                    <MDTypography
                      display="block"
                      variant="button"
                      color="text"
                      fontWeight="regular"
                      sx={{
                        transition: 'all 300ms linear',
                      }}
                    >
                      {item.description}
                    </MDTypography>
                  </MDBox>
                )}
              </MDBox>
            ))}
        </MDBox>
      </SimpleNavbarDropdown>
    ),
  );

  return (
    <Collapse
      in={Boolean(open)}
      timeout="auto"
      unmountOnExit
    >
      <MDBox width="calc(100% + 1.3rem)" my={1.6} ml={-2}>
        {renderNavbarItems}
      </MDBox>
    </Collapse>
  );
}

export default SimpleNavbarMobile;
