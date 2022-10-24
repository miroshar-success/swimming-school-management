import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import { Card, Grid } from '@mui/material';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function OrganizationProfileView(props) {
  const { sidenavColor } = selectMuiSettings();
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Card sx={{ mt: 2 }}>
            <MDBox py={2.4} px={2.4}>
              <Grid spacing={1.6} container>
                <Grid item xs={12}>
                  <MDTypography variant="h4">
                    {i18n(
                      'entities.organizationProfile.sections.about',
                    )}
                  </MDTypography>
                </Grid>

                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.companyName',
                    )}
                    value={record.companyName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.industry',
                    )}
                    value={
                      record.industry &&
                      i18n(
                        `entities.organizationProfile.enumerators.industry.${record.industry}`,
                      )
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.employee',
                    )}
                    value={
                      record.employee &&
                      i18n(
                        `entities.organizationProfile.enumerators.employee.${record.employee}`,
                      )
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.thirdParties',
                    )}
                    value={
                      record.thirdParties &&
                      i18n(
                        `entities.organizationProfile.enumerators.thirdParties.${record.thirdParties}`,
                      )
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.location',
                    )}
                    value={record.location}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
          <Card sx={{ mt: 2 }}>
            <MDBox py={2.4} px={2.4}>
              <Grid spacing={1.6} container>
                <Grid item xs={12}>
                  <MDTypography variant="h4">
                    {i18n(
                      'entities.organizationProfile.sections.compliance',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.regulatoryCompliance',
                    )}
                    value={record.regulatoryCompliance}
                    render={(values) =>
                      (values || []).map((value) => (
                        <MDBadgeDot
                          key={value}
                          width="max-content"
                          badgeContent={
                            value
                              ? i18n(
                                  `entities.organizationProfile.enumerators.regulatoryCompliance.${value}`,
                                )
                              : null
                          }
                          color={sidenavColor}
                          variant="contained"
                          size="md"
                        />
                      ))
                    }
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
          <Card sx={{ mt: 2 }}>
            <MDBox py={2.4} px={2.4}>
              <Grid spacing={1.6} container>
                <Grid item xs={12}>
                  <MDTypography variant="h4">
                    {i18n(
                      'entities.organizationProfile.sections.technology',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.technologyStack',
                    )}
                    value={
                      record.technologyStack &&
                      i18n(
                        `entities.organizationProfile.enumerators.technologyStack.${record.technologyStack}`,
                      )
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.outsourcedIT',
                    )}
                    checked={record.outsourcedIT}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Card sx={{ mt: 2 }}>
            <MDBox py={2.4} px={2.4}>
              <Grid spacing={1.6} container>
                <Grid item xs={12}>
                  <MDTypography variant="h4">
                    {i18n(
                      'entities.organizationProfile.sections.securityProgram',
                    )}
                  </MDTypography>
                </Grid>

                <Grid item xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.outsourcedSecurityOperations',
                    )}
                    checked={
                      record.outsourcedSecurityOperations
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.pastIncidents',
                    )}
                    noData={i18n('customViewer.default')}
                    value={record.pastIncidents}
                    multiline
                  />
                </Grid>

                <Grid item xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.cspSecurityPolicies',
                    )}
                    checked={record.cspSecurityPolicies}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.cspListITAssets',
                    )}
                    checked={record.cspListITAssets}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.cspJobRoleInfoSecTraining',
                    )}
                    checked={
                      record.cspJobRoleInfoSecTraining
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.cspIncidentMgmtPlan',
                    )}
                    checked={record.cspIncidentMgmtPlan}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.cspIncidentVendorNotification',
                    )}
                    checked={
                      record.cspIncidentVendorNotification
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.cspCyberInsurance',
                    )}
                    checked={record.cspCyberInsurance}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.cspLatestCyberAwarenessThreats',
                    )}
                    checked={
                      record.cspLatestCyberAwarenessThreats
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.cspMFAUtilized',
                    )}
                    checked={record.cspMFAUtilized}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.cspSecurityTesting',
                    )}
                    checked={record.cspSecurityTesting}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.organizationProfile.fields.cspBackupStrategy',
                    )}
                    checked={record.cspBackupStrategy}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default OrganizationProfileView;
