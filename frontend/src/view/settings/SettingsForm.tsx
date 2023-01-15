import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import {
  useForm,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/settings/settingsActions';
import CloseIcon from '@mui/icons-material/Close';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import ImagesFormItem from '../shared/form/items/ImagesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import SaveIcon from '@mui/icons-material/Save';
import selectors from 'src/modules/settings/settingsSelectors';
import settingsThemeConverter from 'src/modules/settings/settingsThemeConverter';
import Storage from 'src/security/storage';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { Grid, Card, Divider } from '@mui/material';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import lessonEnumerators from 'src/modules/lesson/lessonEnumerators';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';

const schema = yup.object().shape({
  theme: yup
    .string()
    .nullable(true)
    .label(i18n('settings.fields.theme'))
    .required()
    .transform((_, originalValue) => {
      return settingsThemeConverter.toString(originalValue);
    }),
  logos: yupFormSchemas.files(
    i18n('settings.fields.logos'),
    {
      max: 1,
    },
  ),
  name: yupFormSchemas.string(
    i18n('settings.fields.name'),
    {
      required: true,
      max: 255,
    },
  ),
  email: yupFormSchemas.email(
    i18n('settings.fields.email'),
    {
      required: true,
    },
  ),
  ownerName: yupFormSchemas.string(
    i18n('settings.fields.ownerName'),
    {
      max: 255,
    },
  ),
  phoneNumber: yupFormSchemas.string(
    i18n('settings.fields.phoneNumber'),
    {
      matches: /^[0-9]/,
      max: 24,
    },
  ),
  cellPhoneNumber: yupFormSchemas.string(
    i18n('settings.fields.cellPhoneNumber'),
    {
      matches: /^[0-9]/,
      max: 24,
    },
  ),
  direction: yupFormSchemas.string(
    i18n('settings.fields.direction'),
    {
      max: 255,
    },
  ),
  zipCode: yupFormSchemas.string(
    i18n('settings.fields.zipCode'),
    {
      max: 12,
    },
  ),
  cologne: yupFormSchemas.string(
    i18n('settings.fields.cologne'),
    {
      max: 255,
    },
  ),
  condition: yupFormSchemas.string(
    i18n('settings.fields.condition'),
    {
      max: 48,
    },
  ),
  town: yupFormSchemas.string(
    i18n('settings.fields.town'),
    {
      max: 48,
    },
  ),
  description: yupFormSchemas.string(
    i18n('settings.fields.description'),
    {},
  ),
  start0: yupFormSchemas.string('', { max: 12 }),
  start1: yupFormSchemas.string('', { max: 12 }),
  start2: yupFormSchemas.string('', { max: 12 }),
  start3: yupFormSchemas.string('', { max: 12 }),
  start4: yupFormSchemas.string('', { max: 12 }),
  start5: yupFormSchemas.string('', { max: 12 }),
  start6: yupFormSchemas.string('', { max: 12 }),
  end0: yupFormSchemas.string('', { max: 12 }),
  end1: yupFormSchemas.string('', { max: 12 }),
  end2: yupFormSchemas.string('', { max: 12 }),
  end3: yupFormSchemas.string('', { max: 12 }),
  end4: yupFormSchemas.string('', { max: 12 }),
  end5: yupFormSchemas.string('', { max: 12 }),
  end6: yupFormSchemas.string('', { max: 12 }),
  cafe: yupFormSchemas.boolean(
    i18n('settings.fields.cafe'),
    {},
  ),
  parkingLot: yupFormSchemas.boolean(
    i18n('settings.fields.parkingLot'),
    {},
  ),
  balletParking: yupFormSchemas.boolean(
    i18n('settings.fields.balletParking'),
    {},
  ),
  waitingRoom: yupFormSchemas.boolean(
    i18n('settings.fields.waitingRoom'),
    {},
  ),
  gym: yupFormSchemas.boolean(
    i18n('settings.fields.gym'),
    {},
  ),
  bathroom: yupFormSchemas.boolean(
    i18n('settings.fields.bathroom'),
    {},
  ),
  wateringCan: yupFormSchemas.boolean(
    i18n('settings.fields.wateringCan'),
    {},
  ),
  dressingRoom: yupFormSchemas.boolean(
    i18n('settings.fields.dressingRoom'),
    {},
  ),
  twitter: yupFormSchemas.string(
    i18n('settings.fields.twitter'),
    {
      max: 128,
    },
  ),
  facebook: yupFormSchemas.string(
    i18n('settings.fields.facebook'),
    {
      max: 128,
    },
  ),
  instagram: yupFormSchemas.string(
    i18n('settings.fields.instagram'),
    {
      max: 128,
    },
  ),
  photographs: yupFormSchemas.files(
    i18n('settings.fields.backgroundImages'),
    {
      max: 8,
    },
  ),
});

function SettingsForm(props) {
  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const settings = props.settings;

  const [initialValues] = useState(() => {
    return {
      ...(settings || {}),
      theme: settingsThemeConverter.fromString(
        settings && settings.theme,
      ),
      start0: settings.openingHours[0]?.start,
      start1: settings.openingHours[1]?.start,
      start2: settings.openingHours[2]?.start,
      start3: settings.openingHours[3]?.start,
      start4: settings.openingHours[4]?.start,
      start5: settings.openingHours[5]?.start,
      start6: settings.openingHours[6]?.start,
      end0: settings.openingHours[0]?.end,
      end1: settings.openingHours[1]?.end,
      end2: settings.openingHours[2]?.end,
      end3: settings.openingHours[3]?.end,
      end4: settings.openingHours[4]?.end,
      end5: settings.openingHours[5]?.end,
      end6: settings.openingHours[6]?.end,
    };
  });

  console.log(settings);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  useEffect(() => {
    form.register({ name: 'theme' });
  }, []);

  const onSubmit = (values) => {
    let openingHours = [];
    for (let i = 0; i < 7; i++) {
      openingHours.push({
        start: values[`start${i}`],
        end: values[`end${i}`],
      });
    }
    dispatch(actions.doSave({ ...values, openingHours }));
  };

  const onReset = () => {
    // little hack to reset the uncontrolled component
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MDBox py={2.4} px={2.4}>
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <MDTypography variant="h3">
                {i18n('settings.title')}
              </MDTypography>
              <FormButtons>
                <MDButton
                  variant="gradient"
                  color={sidenavColor}
                  disabled={saveLoading}
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  startIcon={<SaveIcon />}
                  size="small"
                >
                  {i18n('common.save')}
                </MDButton>

                <MDButton
                  variant="outlined"
                  color={sidenavColor}
                  disabled={saveLoading}
                  onClick={onReset}
                  type="button"
                  startIcon={<UndoIcon />}
                  size="small"
                >
                  {i18n('common.reset')}
                </MDButton>

                {props.onCancel ? (
                  <MDButton
                    variant="outlined"
                    color={sidenavColor}
                    disabled={saveLoading}
                    onClick={() => props.onCancel()}
                    type="button"
                    startIcon={<CloseIcon />}
                    size="small"
                  >
                    {i18n('common.cancel')}
                  </MDButton>
                ) : null}
              </FormButtons>
            </MDBox>
          </MDBox>
          <Grid container spacing={1.6}>
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
                            'settings.subtitle.generalData',
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
                      <Grid spacing={1.6} container>
                        <Grid item md={4} xs={12}>
                          <ImagesFormItem
                            name="logos"
                            label={i18n(
                              'settings.fields.logos',
                            )}
                            storage={
                              Storage.values.settingsLogos
                            }
                            max={1}
                          />
                        </Grid>
                        <Grid item md={8} xs={12}>
                          <Grid container spacing={1.6}>
                            <Grid item md={6} xs={12}>
                              <InputFormItem
                                name="name"
                                label={i18n(
                                  'settings.fields.name',
                                )}
                                variant="standard"
                                required={true}
                                autoFocus
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <InputFormItem
                                name="email"
                                label={i18n(
                                  'settings.fields.email',
                                )}
                                variant="standard"
                                required={true}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <InputFormItem
                                name="ownerName"
                                label={i18n(
                                  'settings.fields.owner',
                                )}
                                variant="standard"
                              />
                            </Grid>
                            <Grid item md={3} xs={12}>
                              <InputFormItem
                                name="phoneNumber"
                                label={i18n(
                                  'settings.fields.phoneNumber',
                                )}
                                variant="standard"
                              />
                            </Grid>
                            <Grid item md={3} xs={12}>
                              <InputFormItem
                                name="cellPhoneNumber"
                                label={i18n(
                                  'settings.fields.cellPhoneNumber',
                                )}
                                variant="standard"
                              />
                            </Grid>
                            <Grid item md={9} xs={12}>
                              <InputFormItem
                                name="direction"
                                label={i18n(
                                  'settings.fields.direction',
                                )}
                                variant="standard"
                              />
                            </Grid>
                            <Grid item md={3} xs={12}>
                              <InputFormItem
                                name="zipCode"
                                label={i18n(
                                  'settings.fields.zipCode',
                                )}
                                variant="standard"
                              />
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <InputFormItem
                                name="cologne"
                                label={i18n(
                                  'settings.fields.cologne',
                                )}
                                variant="standard"
                              />
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <InputFormItem
                                name="condition"
                                label={i18n(
                                  'settings.fields.condition',
                                )}
                                variant="standard"
                              />
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <InputFormItem
                                name="town"
                                label={i18n(
                                  'settings.fields.town',
                                )}
                                variant="standard"
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
                            'settings.subtitle.description',
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
                      <HtmlEditorFormItem
                        name="description"
                        label={i18n(
                          'settings.fields.description',
                        )}
                        value={settings.description}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
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
                            'settings.subtitle.openingHours',
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
                        <Grid item xs={4}>
                          <MDTypography
                            variant="h6"
                            fontWeight="medium"
                          >
                            {i18n('settings.fields.day')}
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <MDTypography
                            variant="h6"
                            fontWeight="medium"
                          >
                            {i18n(
                              'settings.fields.opening',
                            )}
                          </MDTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <MDTypography
                            variant="h6"
                            fontWeight="medium"
                          >
                            {i18n(
                              'settings.fields.closing',
                            )}
                          </MDTypography>
                        </Grid>
                      </Grid>
                      <Divider />
                    </Grid>
                    {[1, 2, 3, 4, 5, 6, 0].map((index) => (
                      <Grid item xs={12} key={index}>
                        <Grid container spacing={1.6}>
                          <Grid item xs={4}>
                            <MDTypography
                              variant="h6"
                              fontWeight="regular"
                              textTransform="uppercase"
                            >
                              {lessonEnumerators.day[index]}
                            </MDTypography>
                          </Grid>
                          <Grid item xs={4}>
                            <InputFormItem
                              name={`start${index}`}
                              label=""
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <InputFormItem
                              name={`end${index}`}
                              label=""
                            />
                          </Grid>
                        </Grid>
                        {index !== 0 && (
                          <Divider light={true} />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid container spacing={1.6}>
                <Grid item xs={12}>
                  <Card>
                    <MDBox p={2.4}>
                      <Grid container spacing={1.6}>
                        <Grid item xs={12}>
                          <MDBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <MDTypography variant="h5">
                              {i18n(
                                'settings.subtitle.service',
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
                              <CheckboxFormItem
                                name="cafe"
                                label={i18n(
                                  'settings.fields.cafe',
                                )}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <CheckboxFormItem
                                name="parkingLot"
                                label={i18n(
                                  'settings.fields.parkingLot',
                                )}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <CheckboxFormItem
                                name="balletParking"
                                label={i18n(
                                  'settings.fields.balletParking',
                                )}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <CheckboxFormItem
                                name="waitingRoom"
                                label={i18n(
                                  'settings.fields.waitingRoom',
                                )}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <CheckboxFormItem
                                name="gym"
                                label={i18n(
                                  'settings.fields.gym',
                                )}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <CheckboxFormItem
                                name="bathroom"
                                label={i18n(
                                  'settings.fields.bathroom',
                                )}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <CheckboxFormItem
                                name="wateringCan"
                                label={i18n(
                                  'settings.fields.wateringCan',
                                )}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <CheckboxFormItem
                                name="dressingRoom"
                                label={i18n(
                                  'settings.fields.dressingRoom',
                                )}
                              />
                            </Grid>
                          </Grid>
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
                          <MDBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <MDTypography variant="h5">
                              {i18n(
                                'student.subtitle.social',
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
                          <InputFormItem
                            name="twitter"
                            label={i18n(
                              'settings.fields.twitter',
                            )}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputFormItem
                            name="facebook"
                            label={i18n(
                              'settings.fields.facebook',
                            )}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputFormItem
                            name="instagram"
                            label={i18n(
                              'settings.fields.instagram',
                            )}
                            variant="standard"
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <MDBox p={2.4}>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <MDTypography variant="h5">
                          {i18n(
                            'settings.subtitle.photographs',
                          )}
                        </MDTypography>
                        <MDTypography
                          variant="button"
                          color="text"
                          fontWeight="bold"
                        />
                      </MDBox>
                      <MDTypography
                        variant="h6"
                        fontWeight="light"
                      >
                        {i18n(
                          'settings.description.photographs',
                        )}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <ImagesFormItem
                        name="photographs"
                        label={i18n(
                          'settings.fields.photographs',
                        )}
                        storage={
                          Storage.values.settingsPhotographs
                        }
                        max={8}
                      />
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

export default SettingsForm;
