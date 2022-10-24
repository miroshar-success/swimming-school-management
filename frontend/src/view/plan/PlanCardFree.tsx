import { Card, Icon } from '@mui/material';
import { useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import Plans from 'src/security/plans';

export default function PlanCardFree(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const color = darkMode ? 'dark' : 'white';
  const badge = {
    color: sidenavColor,
    label: i18n(`plan.${Plans.values.free}.label`),
  };

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const isCurrentPlan =
    currentTenant.plan === Plans.values.free;

  const buttonState = isCurrentPlan ? 'current' : null;

  const specifications = props.specifications || [];

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
    <>
      <Card
        sx={{
          boxShadow: ({ boxShadows: { lg } }) =>
            props.shadow ? lg : 'none',
          height: '100%',
          display: 'flex',
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
                  {i18n(`plan.free.unit`)}
                </MDTypography>
                {i18n(`plan.free.price`)}
                <MDTypography
                  display="inline"
                  component="small"
                  variant="h5"
                  color="inherit"
                >
                  /{i18n('plan.pricingPeriod')}
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox pb={2.4} px={2.4}>
            {renderSpecifications}
            <MDBox mt={2.4} display="flex" alignItems="end">
              {buttonState === 'current' && (
                <MDButton
                  fullWidth
                  color={sidenavColor}
                  variant="gradient"
                  disabled={true}
                >
                  {i18n('plan.current')}&nbsp;
                  <Icon sx={{ fontWeight: 'bold' }}>
                    arrow_forward
                  </Icon>
                </MDButton>
              )}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </>
  );
}
