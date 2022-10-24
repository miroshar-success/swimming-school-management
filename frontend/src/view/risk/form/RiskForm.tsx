import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import EditRiskLayout from 'src/view/risk/form/EditRiskLayout';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import NewRiskLayout from 'src/view/risk/form/NewRiskLayout';
import riskEnumerators from 'src/modules/risk/riskEnumerators';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  title: yupFormSchemas.string(
    i18n('entities.risk.fields.title'),
    {
      required: true,
      min: 1,
      max: 250,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.risk.fields.description'),
    {
      max: 2500,
      min: 1,
    },
  ),
  category: yupFormSchemas.relationToOne(
    i18n('entities.risk.fields.category'),
    {
      required: true,
    },
  ),
  status: yupFormSchemas.enumerator(
    i18n('entities.risk.fields.status'),
    {
      required: true,
      options: riskEnumerators.status,
    },
  ),
  owner: yupFormSchemas.relationToOne(
    i18n('entities.risk.fields.owner'),
    {},
  ),
  likelihood: yupFormSchemas.enumerator(
    i18n('entities.risk.fields.likelihood'),
    {
      required: true,
      options: riskEnumerators.likelihood,
    },
  ),
  impact: yupFormSchemas.enumerator(
    i18n('entities.risk.fields.impact'),
    {
      required: true,
      options: riskEnumerators.impact,
    },
  ),
  inherentScore: yupFormSchemas.enumerator(
    i18n('entities.risk.fields.inherentScore'),
    {
      required: true,
      options: riskEnumerators.inherentScore,
    },
  ),
  residualScore: yupFormSchemas.integer(
    i18n('entities.risk.fields.residualScore'),
    {
      required: true,
    },
  ),
  cost: yupFormSchemas.decimal(
    i18n('entities.risk.fields.cost'),
    {
      required: true,
    },
  ),
  tasks: yupFormSchemas.relationToMany(
    i18n('entities.risk.fields.tasks'),
    {},
  ),
  newsArticles: yupFormSchemas.relationToMany(
    i18n('entities.risk.fields.newsArticles'),
    {},
  ),
  products: yupFormSchemas.relationToMany(
    i18n('entities.risk.fields.products'),
    {},
  ),
  policyTemplates: yupFormSchemas.relationToMany(
    i18n('entities.risk.fields.policyTemplates'),
    {},
  ),
  policies: yupFormSchemas.relationToMany(
    i18n('entities.risk.fields.policies'),
    {},
  ),
  attachments: yupFormSchemas.files(
    i18n('entities.risk.fields.attachments'),
    {},
  ),
  notes: yupFormSchemas.relationToMany(
    i18n('entities.risk.fields.notes'),
    {
      max: 50,
    },
  ),
  tags: yupFormSchemas.relationToMany(
    i18n('entities.risk.fields.tags'),
    {},
  ),
});

function RiskForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      reference: record.reference,
      title: record.title,
      description: record.description,
      category: record.category,
      status: record.status,
      owner: record.owner,
      likelihood:
        record.likelihood || riskEnumerators.likelihood[0],
      impact: record.impact || riskEnumerators.impact[0],
      inherentScore: record.inherentScore,
      residualScore: record.residualScore,
      cost: record.cost,
      notes: record.notes || [],
      newsArticles: record.newsArticles || [],
      products: record.products || [],
      policyTemplates: record.policyTemplates || [],
      policies: record.policies || [],
      attachments: record.attachments || [],
      tasks: record.tasks || [],
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

  const { saveLoading, modal, isEditing } = props;

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
              <NewRiskLayout modal />
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
                      <NewRiskLayout modal />
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
                {i18n('entities.risk.edit.title')}
              </MDTypography>
              {makeFormButtons(true)}
            </MDBox>
          )}
          {!isEditing && modal && makeFormButtons(modal)}
          {isEditing && (
            <EditRiskLayout
              initialValues={{ ...initialValues }}
              modal
            />
          )}
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default RiskForm;
