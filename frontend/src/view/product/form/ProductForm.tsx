import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import EditProductLayout from 'src/view/product/form/EditProductLayout';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import NewProductLayout from 'src/view/product/form/NewProductLayout';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  title: yupFormSchemas.string(
    i18n('entities.product.fields.title'),
    {
      required: true,
      min: 1,
      max: 200,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.product.fields.description'),
    {
      required: true,
      min: 1,
      max: 1000,
    },
  ),
  category: yupFormSchemas.relationToOne(
    i18n('entities.product.fields.category'),
    {
      required: true,
    },
  ),
  website: yupFormSchemas.string(
    i18n('entities.product.fields.website'),
    {
      required: true,
      max: 100,
      min: 1,
    },
  ),
  logo: yupFormSchemas.images(
    i18n('entities.product.fields.logo'),
    {
      required: true,
      max: 1,
    },
  ),
  rating: yupFormSchemas.decimal(
    i18n('entities.product.fields.rating'),
    {
      max: 5,
      min: 0,
    },
  ),
  price: yupFormSchemas.integer(
    i18n('entities.product.fields.price'),
    {
      min: 0,
      max: 100,
    },
  ),
  tags: yupFormSchemas.relationToMany(
    i18n('entities.product.fields.tags'),
    {},
  ),
});

function ProductForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      reference: record.reference,
      title: record.title,
      description: record.description,
      category: record.category,
      website: record.website,
      logo: record.logo || [],
      rating: record.rating,
      price: record.price,
      tags: record.tags || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const { saveLoading, modal, isEditing, title } = props;

  const makeFormButtons = (modal = false) => {
    return (
      <FormButtons
        style={{
          flexDirection: modal ? 'row-reverse' : undefined,
        }}
      >
        <MDButton
          variant="gradient"
          color={sidenavColor}
          disabled={saveLoading}
          type="submit"
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
    );
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {!isEditing &&
            (modal ? (
              <NewProductLayout title={title} modal />
            ) : (
              <Grid
                container
                spacing={1.6}
                justifyContent="center"
                mt={0.8}
              >
                <Grid item lg={9} md={8} sm={12} xs={12}>
                  <Card>
                    <MDBox px={1.6} py={1.6}>
                      <NewProductLayout
                        title={title}
                        modal
                      />
                      <MDBox px={0.8}>
                        {makeFormButtons(true)}
                      </MDBox>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            ))}
          {isEditing && (
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDTypography variant="h4">
                {i18n('entities.product.edit.title')}
              </MDTypography>
              {makeFormButtons(true)}
            </MDBox>
          )}
          {!isEditing && modal && makeFormButtons(modal)}
          {isEditing && (
            <EditProductLayout
              initialValues={{ ...initialValues }}
              title={title}
              modal
            />
          )}
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default ProductForm;
