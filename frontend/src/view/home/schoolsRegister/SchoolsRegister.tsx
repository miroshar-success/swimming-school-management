import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDButton from 'src/mui/components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { Card, Grid } from '@mui/material';
import Storage from 'src/security/storage';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import studentEnumerators from 'src/modules/student/studentEnumerators';

const schema = yup.object().shape({
  firstName: yupFormSchemas.string(
    i18n('user.fields.firstName'),
    {
      required: true,
      max: 80,
    },
  ),
  lastName: yupFormSchemas.string(
    i18n('user.fields.lastName'),
    {
      required: true,
      max: 175,
    },
  ),
  phoneNumber: yupFormSchemas.string(
    i18n('user.fields.phoneNumber'),
    {
      required: true,
      matches: /^[0-9]/,
      max: 24,
    },
  ),
  street: yupFormSchemas.string(
    i18n('user.fields.street'),
    {
      required: true,
    },
  ),
  postalCode: yupFormSchemas.string(
    i18n('user.fields.postalCode'),
    {
      required: true,
    },
  ),
  cologne: yupFormSchemas.string(
    i18n('user.fields.cologne'),
    {
      required: true,
    },
  ),
  city: yupFormSchemas.string(i18n('user.fields.city'), {
    required: true,
  }),
  RFC: yupFormSchemas.string(i18n('user.fields.RFC'), {
    required: true,
    max: 50,
  }),
  CURP: yupFormSchemas.string(i18n('user.fields.CURP'), {
    required: true,
    max: 50,
  }),
  bloodType: yupFormSchemas.string(
    i18n('user.fields.bloodType'),
    {
      required: true,
      max: 2,
    },
  ),
  sex: yupFormSchemas.string(i18n('user.fields.sex'), {
    required: true,
    max: 10,
  }),
  birthday: yupFormSchemas.date(
    i18n('user.fields.birthday'),
    {
      required: true,
    },
  ),
  guardianPhoneNumber: yupFormSchemas.string(
    i18n('user.fields.guardianPhoneNumber'),
    {
      matches: /^[0-9]/,
    },
  ),
  guardianFullName: yupFormSchemas.string(
    i18n('user.fields.guardianFullName'),
  ),
  healthInsuranceCompany: yupFormSchemas.string(
    i18n('user.fields.healthInsuranceCompany'),
  ),
  healthInsuranceNumber: yupFormSchemas.string(
    i18n('user.fields.healthInsuranceNumber'),
  ),
  comment: yupFormSchemas.string(
    i18n('user.fields.comment'),
  ),
  email: yupFormSchemas.email(i18n('user.fields.email'), {
    required: true,
  }),
  password: yupFormSchemas.string(
    i18n('user.fields.email'),
    {
      required: true,
    },
  ),
});

function SchoolsRegister(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();

  const [initialValues] = useState(() => {
    return {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      street: '',
      postalCode: '',
      cologne: '',
      city: '',
      RFC: '',
      CURP: '',
      bloodType: '',
      sex: '',
      birthday: '',
      guardianFullName: '',
      guardianPhoneNumber: '',
      healthInsuranceCompany: '',
      healthInsuranceNumber: '',
      comment: '',
      email: '',
      password: '',
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const { ...data } = values;

    props.onSubmit(data);
  };

  const { saveLoading } = props;

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          {i18n(
                            'student.subtitle.profileData',
                          )}
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
                            name="firstName"
                            label={i18n(
                              'user.fields.firstName',
                            )}
                            variant="standard"
                            required={true}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputFormItem
                            name="lastName"
                            label={i18n(
                              'user.fields.lastName',
                            )}
                            variant="standard"
                            required={true}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <SelectFormItem
                            name="sex"
                            label={i18n('user.fields.sex')}
                            options={studentEnumerators.sex.map(
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
                              'user.fields.birthday',
                            )}
                            required={true}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <SelectFormItem
                            name="bloodType"
                            label={i18n(
                              'user.fields.bloodType',
                            )}
                            options={studentEnumerators.bloodType.map(
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
                          <InputFormItem
                            name="phoneNumber"
                            label={i18n(
                              'user.fields.phoneNumber',
                            )}
                            variant="standard"
                            required={true}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputFormItem
                            name="email"
                            label={i18n(
                              'user.fields.email',
                            )}
                            required={true}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputFormItem
                            name="password"
                            label={i18n(
                              'user.fields.password',
                            )}
                            required={true}
                            variant="standard"
                            type="password"
                          />
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
                          {i18n(
                            'student.subtitle.otherData',
                          )}
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
                            label={i18n('user.fields.RFC')}
                            variant="standard"
                            required={true}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputFormItem
                            name="CURP"
                            label={i18n('user.fields.CURP')}
                            variant="standard"
                            required={true}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <MDTypography
                            variant="h6"
                            fontWeight="medium"
                            sx={{
                              pt: 2,
                              pb: 0,
                              mb: 0,
                            }}
                          >
                            {i18n(
                              'schools.description.minor',
                            )}
                          </MDTypography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputFormItem
                            name="guardianFullName"
                            label={i18n(
                              'user.fields.guardianFullName',
                            )}
                            required={false}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputFormItem
                            name="guardianPhoneNumber"
                            label={i18n(
                              'user.fields.guardianPhoneNumber',
                            )}
                            required={false}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputFormItem
                            name="healthInsuranceCompany"
                            label={i18n(
                              'user.fields.healthInsuranceCompany',
                            )}
                            required={false}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputFormItem
                            name="healthInsuranceNumber"
                            label={i18n(
                              'user.fields.healthInsuranceNumber',
                            )}
                            required={false}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextAreaFormItem
                            name="comment"
                            label={i18n(
                              'user.fields.diseaseAllergyCondition',
                            )}
                            required={false}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <MDBox
                            display="flex"
                            justifyContent="end"
                          >
                            <MDButton
                              variant="gradient"
                              color={sidenavColor}
                              disabled={saveLoading}
                              type="submit"
                              onClick={form.handleSubmit(
                                onSubmit,
                              )}
                              startIcon={
                                <SaveIcon fontWeight="large" />
                              }
                              sx={{
                                px: 4,
                                py: 1.5,
                              }}
                            >
                              {i18n('common.save')}
                            </MDButton>
                          </MDBox>
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
                          {i18n('student.subtitle.address')}
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
                            label={i18n(
                              'user.fields.address',
                            )}
                            variant="standard"
                            required={true}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputFormItem
                            name="postalCode"
                            label={i18n(
                              'user.fields.postalCode',
                            )}
                            variant="standard"
                            required={true}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputFormItem
                            name="cologne"
                            label={i18n(
                              'user.fields.cologne',
                            )}
                            variant="standard"
                            required={true}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputFormItem
                            name="city"
                            label={i18n('user.fields.city')}
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
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default SchoolsRegister;
