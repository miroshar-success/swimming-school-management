import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function SecurityProgramSection({ visible }): JSX.Element {
  return (
    <MDBox display={visible ? 'block' : 'none'}>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">
          {i18n(
            'entities.organizationProfile.sections.securityProgram',
          )}
        </MDTypography>
      </MDBox>
      <MDBox mt={1.3}>
        <Grid spacing={1.6} container>
          <Grid item sm={12} xs={12}>
            <SwitchFormItem
              name="outsourcedSecurityOperations"
              label={i18n(
                'entities.organizationProfile.fields.outsourcedSecurityOperations',
              )}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextAreaFormItem
              name="pastIncidents"
              label={i18n(
                'entities.organizationProfile.fields.pastIncidents',
              )}
              variant="standard"
              required={false}
              fullWidth
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SwitchFormItem
              name="cspSecurityPolicies"
              label={i18n(
                'entities.organizationProfile.fields.cspSecurityPolicies',
              )}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SwitchFormItem
              name="cspListITAssets"
              label={i18n(
                'entities.organizationProfile.fields.cspListITAssets',
              )}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SwitchFormItem
              name="cspJobRoleInfoSecTraining"
              label={i18n(
                'entities.organizationProfile.fields.cspJobRoleInfoSecTraining',
              )}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SwitchFormItem
              name="cspIncidentMgmtPlan"
              label={i18n(
                'entities.organizationProfile.fields.cspIncidentMgmtPlan',
              )}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SwitchFormItem
              name="cspIncidentVendorNotification"
              label={i18n(
                'entities.organizationProfile.fields.cspIncidentVendorNotification',
              )}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SwitchFormItem
              name="cspCyberInsurance"
              label={i18n(
                'entities.organizationProfile.fields.cspCyberInsurance',
              )}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SwitchFormItem
              name="cspLatestCyberAwarenessThreats"
              label={i18n(
                'entities.organizationProfile.fields.cspLatestCyberAwarenessThreats',
              )}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SwitchFormItem
              name="cspMFAUtilized"
              label={i18n(
                'entities.organizationProfile.fields.cspMFAUtilized',
              )}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SwitchFormItem
              name="cspSecurityTesting"
              label={i18n(
                'entities.organizationProfile.fields.cspSecurityTesting',
              )}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <SwitchFormItem
              name="cspBackupStrategy"
              label={i18n(
                'entities.organizationProfile.fields.cspBackupStrategy',
              )}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default SecurityProgramSection;
