import { Card, Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import { useDispatch } from 'react-redux';
import formActions from 'src/modules/form/formActions';
import ClassAutocompleteFormItem from 'src/view/class/autocomplete/ClassAutocompleteFormItem';
import TeacherAutocompleteFormItem from 'src/view/teacher/autocomplete/TeacherAutocompleteFormItem';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import Storage from 'src/security/storage';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import TimePickerFormItem from 'src/view/shared/form/items/TimePickerFormItem';
import paymentEnumerators from 'src/modules/payment/paymentEnumerators';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import PaymentCategoryAutocompleteFormItem from 'src/view/paymentCategory/autocomplete/PaymentCategoryAutocompleteFormItem';
import PaymentMethodAutocompleteFormItem from 'src/view/paymentMethod/autocomplete/PaymentMethodAutocompleteFormItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';

const schema = yup.object().shape({
  category: yupFormSchemas.relationToOne(
    i18n('payment.fields.category'),
    {
      required: true,
    },
  ),
  price: yupFormSchemas.decimal(
    i18n('payment.fields.price'),
    {
      required: true,
    },
  ),
  quantity: yupFormSchemas.integer(
    i18n('payment.fields.quantity'),
    {
      required: true,
    },
  ),
  VAT: yupFormSchemas.decimal(i18n('payment.fields.VAT'), {
    required: true,
  }),
  year: yupFormSchemas.integer(
    i18n('payment.fields.year'),
    {
      required: true,
    },
  ),
  month: yupFormSchemas.integer(
    i18n('payment.fields.month'),
    {
      required: true,
    },
  ),
  paymentMethod: yupFormSchemas.relationToOne(
    i18n('payment.fields.paymentMethod'),
    {
      required: true,
    },
  ),
  lessonsNumber: yupFormSchemas.integer(
    i18n('payment.fields.lessonsNumber'),
    {
      required: true,
    },
  ),
  cost: yupFormSchemas.decimal(
    i18n('payment.fields.cost'),
    {
      required: true,
    },
  ),
});

function PaymentForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const student = props.record || {};
    return {
      category: '',
      price: 0,
      quantity: 0,
      VAT: 0,
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      paymentMethod: '',
      lessonsNumber: '',
      cost: 0,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    console.log(values);
    props.onSubmit(props.record?.id, values);
  };

  const totalCost = () => {
    const multipleValues = form.getValues([
      'price',
      'quantity',
      'VAT',
    ]);
    const cost =
      Number(
        multipleValues.price * multipleValues.quantity,
      ) + Number(multipleValues.VAT);
    cost
      ? form.setValue('cost', cost)
      : form.setValue('cost', 0);
    dispatch(formActions.doRefresh());
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const { saveLoading, modal } = props;

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={1.6} container>
            <Grid item xs={12}>
              <MDBox p={2.4}>
                <Grid spacing={1.6} container>
                  <Grid item xs={12}>
                    <Grid spacing={1.6} container>
                      <Grid item md={4} xs={12}>
                        <MDBox px={4}>
                          <LogoViewItem
                            label={i18n(
                              'student.fields.avatars',
                            )}
                            value={props.record.avatars}
                          />
                        </MDBox>
                      </Grid>
                      <Grid item md={8} xs={12}>
                        <Grid container spacing={1.6}>
                          <Grid item xs={12}>
                            <TextViewItem
                              label={i18n(
                                'student.fields.name',
                              )}
                              value={props.record.fullName}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextViewItem
                              label={i18n(
                                'student.fields.class',
                              )}
                              value={
                                props.record.lessons[0]
                                  ?.class.name
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextViewItem
                              label={i18n(
                                'payment.fields.lastPayment',
                              )}
                              value={
                                props.record.payments[
                                  props.record.payments
                                    ?.length - 1
                                ]?.createdAt
                                  ? moment(
                                      props.record.payments[
                                        props.record
                                          .payments
                                          ?.length - 1
                                      ]?.createdAt,
                                    ).format(
                                      DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                                    )
                                  : ''
                              }
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid spacing={1.6} container>
                      <Grid item md={4} xs={12}>
                        <PaymentCategoryAutocompleteFormItem
                          name="category"
                          label={i18n(
                            'payment.fields.category',
                          )}
                          required={true}
                          showCreate={true}
                          variant="standard"
                          mode="single"
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <SelectFormItem
                          name="year"
                          label={i18n(
                            'payment.fields.year',
                          )}
                          options={paymentEnumerators.years.map(
                            (value) => ({
                              value,
                              label: value.toString(),
                            }),
                          )}
                          required={true}
                          mode="single"
                          variant="standard"
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <SelectFormItem
                          name="month"
                          label={i18n(
                            'payment.fields.month',
                          )}
                          options={paymentEnumerators.months.map(
                            (value, index) => ({
                              value: index,
                              label: value,
                            }),
                          )}
                          required={true}
                          mode="single"
                          variant="standard"
                        />
                      </Grid>
                      <Grid item md={2} xs={12}>
                        <InputFormItem
                          name="lessonsNumber"
                          label={i18n(
                            'payment.fields.lessonsNumber',
                          )}
                          required={true}
                          variant="standard"
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <InputFormItem
                          name="price"
                          label={i18n(
                            'payment.fields.price',
                          )}
                          required={true}
                          variant="standard"
                          onBlur={totalCost}
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <InputFormItem
                          name="quantity"
                          label={i18n(
                            'payment.fields.quantity',
                          )}
                          required={true}
                          variant="standard"
                          onBlur={totalCost}
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <InputFormItem
                          name="VAT"
                          label={i18n('payment.fields.VAT')}
                          required={true}
                          variant="standard"
                          onBlur={totalCost}
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <InputFormItem
                          name="cost"
                          label={i18n(
                            'payment.fields.cost',
                          )}
                          variant="standard"
                          disabled={true}
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <PaymentMethodAutocompleteFormItem
                          name="paymentMethod"
                          label={i18n(
                            'payment.fields.paymentMethod',
                          )}
                          variant="standard"
                          mode="single"
                          required={true}
                          showCreate={true}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
          <FormButtons
            style={{
              flexDirection: modal
                ? 'row-reverse'
                : undefined,
            }}
          >
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
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default PaymentForm;
