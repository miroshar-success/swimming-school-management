import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import RiskViewItem from 'src/view/risk/view/RiskViewItem';
import Spinner from 'src/view/shared/Spinner';
import TaskViewItem from 'src/view/task/view/TaskViewItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import VendorCategoryViewItem from 'src/view/vendorCategory/view/VendorCategoryViewItem';
import VendorRatingViewItem from 'src/view/vendor/view/VendorRatingViewItem';
import VendorStatusViewItem from 'src/view/vendor/view/VendorStatusViewItem';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import VendorService from 'src/modules/vendor/vendorService';

function VendorView(props) {
  const { sidenavColor } = selectMuiSettings();
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid item md={8} xs={12}>
          <Card sx={{ height: '100%' }}>
            <MDBox position="relative" p={2.4}>
              <MDTypography
                position="absolute"
                top={0}
                right={0}
                p={1.6}
                textAlign="right"
                variant="button"
                color="text"
                fontWeight="bold"
              >{`# ${record.reference}`}</MDTypography>
              <Grid container spacing={1.6}>
                <Grid item md={6} xs={12}>
                  <MDTypography variant="h3">
                    {record.name}
                  </MDTypography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <VendorCategoryViewItem
                    label={i18n(
                      'entities.vendor.fields.category',
                    )}
                    value={record.category}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.vendor.fields.descriptionOfServices',
                    )}
                    value={record.descriptionOfServices}
                    multiline
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.vendor.fields.status',
                    )}
                    value={[record.status]}
                    render={(values) =>
                      values.map((value) => (
                        <VendorStatusViewItem
                          key={value}
                          value={value}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.vendor.fields.rating',
                    )}
                    value={[record.rating]}
                    render={(values) =>
                      values.map((value) => (
                        <VendorRatingViewItem
                          key={value}
                          value={value}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.vendor.fields.industry',
                    )}
                    value={
                      record.industry &&
                      i18n(
                        `entities.vendor.enumerators.industry.${record.industry}`,
                      )
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.vendor.fields.dataProcessed',
                    )}
                    value={record.dataProcessed}
                    render={(values) =>
                      (values || []).map((value) => (
                        <MDBadgeDot
                          key={value}
                          width="max-content"
                          badgeContent={
                            value
                              ? i18n(
                                  `entities.vendor.enumerators.dataProcessed.${value}`,
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
                <Grid item xs={12}>
                  <CreationInfo {...props} />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid height="100%" container>
            <Grid xs={12} pb={1.6} item>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4}>
                  <Grid spacing={1.6} container>
                    <Grid xs={12} item>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.vendor.fields.logo',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid xs={12} item>
                      <LogoViewItem
                        label={i18n(
                          'entities.vendor.fields.logo',
                        )}
                        value={record.logo}
                        hiddenLabel
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid xs={12} item>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4}>
                  <Grid spacing={1.6} container>
                    <Grid xs={12} item>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.vendor.fields.tags',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid xs={12} item>
                      <TagAutocompleteForm
                        name="tags"
                        id={record.id}
                        handleService={VendorService.tags}
                        tags={record.tags}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card sx={{ height: '100%' }}>
            <MDBox p={2.4}>
              <Grid container spacing={1.6}>
                <Grid item xs={12}>
                  <MDTypography variant="h5">
                    {i18n(
                      'entities.vendor.sections.contactInformation',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.vendor.fields.primaryContactName',
                    )}
                    value={record.primaryContactName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.vendor.fields.primaryContactEmail',
                    )}
                    value={record.primaryContactEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.vendor.fields.primaryContactPhoneNumber',
                    )}
                    value={record.primaryContactPhoneNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.vendor.fields.supportEmail',
                    )}
                    value={record.supportEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.vendor.fields.supportPhoneNumber',
                    )}
                    value={record.supportPhoneNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.vendor.fields.website',
                    )}
                    value={record.website}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.vendor.fields.address',
                    )}
                    value={record.address}
                    multiline
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item md={8} xs={12}>
          <Grid container spacing={1.6}>
            <Grid item xs={12}>
              <Card>
                <MDBox p={2.4}>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.vendor.sections.business',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextViewItem
                        label={i18n(
                          'entities.vendor.fields.internalBusinessSponsor',
                        )}
                        value={
                          record.internalBusinessSponsor
                        }
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextViewItem
                        label={i18n(
                          'entities.vendor.fields.countryOfIncorporation',
                        )}
                        value={
                          record.countryOfIncorporation &&
                          i18n(
                            `entities.vendor.enumerators.countryOfIncorporation.${record.countryOfIncorporation}`,
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FilesViewItem
                        label={i18n(
                          'entities.vendor.fields.contract',
                        )}
                        value={record.contract}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <MDBox p={2.4}>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n(
                          'entities.vendor.sections.compliance',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <FilesViewItem
                        label={i18n(
                          'entities.vendor.fields.documentation',
                        )}
                        value={record.documentation}
                      />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CheckboxViewItem
                        label={i18n(
                          'entities.vendor.fields.dpiaCompleted',
                        )}
                        checked={record.dpiaCompleted}
                      />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CheckboxViewItem
                        label={i18n(
                          'entities.vendor.fields.dtiaCompleted',
                        )}
                        checked={record.dtiaCompleted}
                      />
                    </Grid>
                    <Grid item md={4} xs={12}></Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CheckboxViewItem
                        label={i18n(
                          'entities.vendor.fields.gdpr',
                        )}
                        checked={record.gdpr}
                      />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CheckboxViewItem
                        label={i18n(
                          'entities.vendor.fields.ccpa',
                        )}
                        checked={record.ccpa}
                      />
                    </Grid>
                    <Grid item md={4} xs={12}></Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CheckboxViewItem
                        label={i18n(
                          'entities.vendor.fields.iso27001',
                        )}
                        checked={record.iso27001}
                      />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CheckboxViewItem
                        label={i18n(
                          'entities.vendor.fields.soc1',
                        )}
                        checked={record.soc1}
                      />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CheckboxViewItem
                        label={i18n(
                          'entities.vendor.fields.soc2',
                        )}
                        checked={record.soc2}
                      />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CheckboxViewItem
                        label={i18n(
                          'entities.vendor.fields.hippa',
                        )}
                        checked={record.hippa}
                      />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CheckboxViewItem
                        label={i18n(
                          'entities.vendor.fields.pcidss',
                        )}
                        checked={record.pcidss}
                      />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CheckboxViewItem
                        label={i18n(
                          'entities.vendor.fields.fedramp',
                        )}
                        checked={record.fedramp}
                      />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CheckboxViewItem
                        label={i18n(
                          'entities.vendor.fields.sox',
                        )}
                        checked={record.sox}
                      />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CheckboxViewItem
                        label={i18n(
                          'entities.vendor.fields.cobit',
                        )}
                        checked={record.cobit}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card id="risks-on-vendor">
            <MDBox p={2.4} pb={0}>
              <RiskViewItem value={record.risks} />
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card id="tasks-on-vendor">
            <MDBox p={2.4} pb={0}>
              <TaskViewItem value={record.tasks} />
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

export default VendorView;
