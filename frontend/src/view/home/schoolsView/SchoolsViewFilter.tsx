import { Grid, Card } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/schools/list/schoolsListActions';
import formActions from 'src/modules/form/formActions';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import selectors from 'src/modules/schools/list/schoolsListSelectors';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import schoolsEnumerators from 'src/modules/schools/schoolsEnumerators';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import MDTypography from 'src/mui/components/MDTypography';
import MDButton from 'src/mui/components/MDButton';
import SearchIcon from '@mui/icons-material/Search';

const schema = yup.object().shape({
  name: yupFilterSchemas.string(
    i18n('schools.fields.name'),
  ),
  conditions: yupFilterSchemas.stringArray(
    i18n('schools.fields.conditions'),
  ),
  towns: yupFilterSchemas.stringArray(
    i18n('schools.fields.towns'),
  ),
  cafe: yupFilterSchemas.boolean(
    i18n('schools.fields.cafe'),
  ),
  parkingLot: yupFilterSchemas.boolean(
    i18n('schools.fields.parkingLot'),
  ),
  balletParking: yupFilterSchemas.boolean(
    i18n('schools.fields.balletParking'),
  ),
  waitingRoom: yupFilterSchemas.boolean(
    i18n('schools.fields.waitingRoom'),
  ),
  gym: yupFilterSchemas.boolean(i18n('schools.fields.gym')),
  bathroom: yupFilterSchemas.boolean(
    i18n('schools.fields.bathroom'),
  ),
  wateringCan: yupFilterSchemas.boolean(
    i18n('schools.fields.wateringCan'),
  ),
  dressingRoom: yupFilterSchemas.boolean(
    i18n('schools.fields.dressingRoom'),
  ),
});

const emptyValues = {
  name: '',
  conditions: [],
  towns: [],
  cafe: false,
  parkingLot: false,
  balletParking: false,
  waitingRoom: false,
  gym: false,
  bathroom: false,
  wateringCan: false,
  dressingRoom: false,
};

function SchoolsViewFilter(props) {
  const { sidenavColor } = selectMuiSettings();
  const filter = useSelector(selectors.selectFilter);
  const dispatch = useDispatch();

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...filter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        initialValues,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    console.log(values);
    dispatch(actions.doFetch(values, false));
    dispatch(formActions.doRefresh());
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MDBox
            p={2.4}
            borderRadius="lg"
            bgColor="white"
            shadow="md"
          >
            <Grid container spacing={3.2}>
              <Grid item xs={12}>
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  pb={1}
                >
                  {i18n('schools.subtitle.filters')}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <MDTypography
                  variant="h5"
                  fontWeight="medium"
                  pb={1}
                >
                  {i18n('schools.fields.name')}
                </MDTypography>
                <InputFormItem name={'name'} size="lg" />
              </Grid>
              <Grid item xs={12}>
                <MDTypography
                  variant="h5"
                  fontWeight="medium"
                  pb={1}
                >
                  {i18n('schools.fields.condition')}
                </MDTypography>
                <SelectFormItem
                  name={'conditions'}
                  options={schoolsEnumerators.conditions.map(
                    (value) => ({
                      value,
                      label: value,
                    }),
                  )}
                  mode="multiple"
                  shrink
                />
              </Grid>
              <Grid item xs={12}>
                <MDTypography
                  variant="h5"
                  fontWeight="medium"
                  pb={1}
                >
                  {i18n('schools.fields.towns')}
                </MDTypography>
                <SelectFormItem
                  name={'towns'}
                  options={schoolsEnumerators.towns.map(
                    (value) => ({
                      value,
                      label: value,
                    }),
                  )}
                  mode="multiple"
                  shrink
                />
              </Grid>
              <Grid item xs={12}>
                <MDTypography
                  variant="h5"
                  fontWeight="medium"
                  pb={1}
                >
                  {i18n('schools.subtitle.service')}
                </MDTypography>
                <CheckboxFormItem
                  name={'cafe'}
                  label={i18n('schools.fields.cafe')}
                />
                <CheckboxFormItem
                  name={'parkingLot'}
                  label={i18n('schools.fields.parkingLot')}
                />
                <CheckboxFormItem
                  name={'balletParking'}
                  label={i18n(
                    'schools.fields.balletParking',
                  )}
                />
                <CheckboxFormItem
                  name={'waitingRoom'}
                  label={i18n('schools.fields.waitingRoom')}
                />
                <CheckboxFormItem
                  name={'gym'}
                  label={i18n('schools.fields.gym')}
                />
                <CheckboxFormItem
                  name={'bathroom'}
                  label={i18n('schools.fields.bathroom')}
                />
                <CheckboxFormItem
                  name={'wateringCan'}
                  label={i18n('schools.fields.wateringCan')}
                />
                <CheckboxFormItem
                  name={'dressingRoom'}
                  label={i18n(
                    'schools.fields.dressingRoom',
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="center"
                >
                  <MDButton
                    size="small"
                    variant="gradient"
                    color={sidenavColor}
                    type="submit"
                    disabled={props.loading}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: 18,
                    }}
                  >
                    {i18n('common.search')}
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default SchoolsViewFilter;
