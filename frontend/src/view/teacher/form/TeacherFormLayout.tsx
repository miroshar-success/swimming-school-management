import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Storage from 'src/security/storage';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import teacherEnumerators from 'src/modules/teacher/teacherEnumerators';

function TeacherFormLayout(props) {
  return (
    <Grid spacing={1.6} container>
      <Grid item xs={12}>
        <Card>
          <MDBox p={2.4}>
            <Grid spacing={1.6} container>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h5">
                    {i18n('teacher.subtitle.profileData')}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    color="text"
                    fontWeight="bold"
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <Grid spacing={1.6} container>
                  <Grid item md={4} xs={12}>
                    <ImagesFormItem
                      name="avatars"
                      label={i18n('teacher.fields.avatars')}
                      storage={
                        Storage.values.userAvatarsProfiles
                      }
                      max={1}
                    />
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <Grid container spacing={1.6}>
                      <Grid item md={6} xs={12}>
                        <InputFormItem
                          name="teacherNumber"
                          label={i18n(
                            'teacher.fields.teacherNumber',
                          )}
                          variant="standard"
                          required={true}
                          autoFocus
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <InputFormItem
                          name="phoneNumber"
                          label={i18n(
                            'teacher.fields.phoneNumber',
                          )}
                          variant="standard"
                          required={true}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <InputFormItem
                          name="firstName"
                          label={i18n(
                            'teacher.fields.firstName',
                          )}
                          variant="standard"
                          required={true}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <InputFormItem
                          name="lastName"
                          label={i18n(
                            'teacher.fields.lastName',
                          )}
                          variant="standard"
                          required={true}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <InputFormItem
                          name="guardianFullName"
                          label={i18n(
                            'teacher.fields.guardianFullName',
                          )}
                          required={false}
                          variant="standard"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <InputFormItem
                          name="guardianPhoneNumber"
                          label={i18n(
                            'teacher.fields.guardianPhoneNumber',
                          )}
                          required={false}
                          variant="standard"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <InputFormItem
                          name="email"
                          label={i18n(
                            'teacher.fields.email',
                          )}
                          required={true}
                          variant="standard"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <InputFormItem
                          name="password"
                          label={i18n(
                            'teacher.fields.password',
                          )}
                          required={true}
                          variant="standard"
                          type="password"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item md={8} xs={12}>
        <Card>
          <MDBox p={2.4}>
            <Grid spacing={1.6} container>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h5">
                    {i18n('teacher.subtitle.otherData')}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    color="text"
                    fontWeight="bold"
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1.6}>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="RFC"
                      label={i18n('teacher.fields.RFC')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="CURP"
                      label={i18n('teacher.fields.CURP')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <SelectFormItem
                      name="bloodType"
                      label={i18n(
                        'teacher.fields.bloodType',
                      )}
                      options={teacherEnumerators.bloodType.map(
                        (value) => ({
                          value,
                          label: value,
                        }),
                      )}
                      required={true}
                      mode="single"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <SelectFormItem
                      name="sex"
                      label={i18n('teacher.fields.sex')}
                      options={teacherEnumerators.sex.map(
                        (value) => ({
                          value,
                          label: value,
                        }),
                      )}
                      mode="single"
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DatePickerFormItem
                      name="birthday"
                      label={i18n(
                        'teacher.fields.birthday',
                      )}
                      required={true}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}></Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="healthInsuranceCompany"
                      label={i18n(
                        'teacher.fields.healthInsuranceCompany',
                      )}
                      required={false}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="healthInsuranceNumber"
                      label={i18n(
                        'teacher.fields.healthInsuranceNumber',
                      )}
                      required={false}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextAreaFormItem
                      name="comment"
                      label={i18n(
                        'teacher.fields.diseaseAllergyCondition',
                      )}
                      required={false}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item md={4} xs={12}>
        <Card>
          <MDBox p={2.4}>
            <Grid spacing={1.6} container>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h5">
                    {i18n('teacher.subtitle.address')}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    color="text"
                    fontWeight="bold"
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1.6}>
                  <Grid item xs={12}>
                    <InputFormItem
                      name="street"
                      label={i18n('teacher.fields.address')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputFormItem
                      name="postalCode"
                      label={i18n(
                        'teacher.fields.postalCode',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputFormItem
                      name="cologne"
                      label={i18n('teacher.fields.cologne')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputFormItem
                      name="city"
                      label={i18n('teacher.fields.city')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default TeacherFormLayout;
