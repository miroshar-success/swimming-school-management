import { Card, Grid } from '@mui/material';
import { getAbsoluteDateTimeByHour } from 'src/modules/utils';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authSelectors from 'src/modules/auth/authSelectors';
import CloseIcon from '@mui/icons-material/Close';
import EditTaskLayout from 'src/view/task/form/EditTaskLayout';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import NewTaskLayout from 'src/view/task/form/NewTaskLayout';
import SaveIcon from '@mui/icons-material/Save';
import taskEnumerators from 'src/modules/task/taskEnumerators';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  title: yupFormSchemas.string(
    i18n('entities.task.fields.title'),
    {
      required: true,
      max: 200,
      min: 1,
    },
  ),
  taskList: yupFormSchemas.relationToMany(
    i18n('entities.task.fields.taskList'),
    {
      required: true,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.task.fields.description'),
    {
      max: 1000,
      min: 1,
    },
  ),
  notes: yupFormSchemas.relationToMany(
    i18n('entities.task.fields.notes'),
    {
      max: 50,
    },
  ),
  priority: yupFormSchemas.relationToOne(
    i18n('entities.task.fields.priority'),
    {
      required: true,
    },
  ),
  repeat: yupFormSchemas.enumerator(
    i18n('entities.task.fields.repeat'),
    {
      required: true,
      options: taskEnumerators.repeat,
    },
  ),
  status: yupFormSchemas.enumerator(
    i18n('entities.task.fields.status'),
    {
      required: true,
      options: taskEnumerators.status,
    },
  ),
  owner: yupFormSchemas.relationToOne(
    i18n('entities.task.fields.owner'),
    {},
  ),
  approver: yupFormSchemas.relationToOne(
    i18n('entities.task.fields.approver'),
    {},
  ),
  dueDate: yupFormSchemas.datetime(
    i18n('entities.task.fields.dueDate'),
    {},
  ),
  completedDate: yupFormSchemas.datetime(
    i18n('entities.task.fields.completedDate'),
    {},
  ),
  newsArticles: yupFormSchemas.relationToMany(
    i18n('entities.task.fields.newsArticles'),
    {},
  ),
  products: yupFormSchemas.relationToMany(
    i18n('entities.task.fields.products'),
    {},
  ),
  policyTemplates: yupFormSchemas.relationToMany(
    i18n('entities.task.fields.policyTemplates'),
    {},
  ),
  policies: yupFormSchemas.relationToMany(
    i18n('entities.task.fields.policies'),
    {},
  ),
  attachments: yupFormSchemas.files(
    i18n('entities.task.fields.attachments'),
    {},
  ),
  tags: yupFormSchemas.relationToMany(
    i18n('entities.task.fields.tags'),
    {},
  ),
});

function TaskForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const defaultTaskPriority = useSelector(
    authSelectors.selectDefaultTaskPriority,
  );
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      reference: record.reference,
      title: record.title,
      taskList: record.taskList || [],
      description: record.description,
      notes: record.notes || [],
      priority: record.priority ?? defaultTaskPriority,
      repeat: record.repeat ?? 'Never',
      status: record.status ?? 'ToDo',
      owner: record.owner,
      approver: record.approver,
      dueDate: record.dueDate
        ? getAbsoluteDateTimeByHour(record.dueDate)
        : null,
      completedDate: record.completedDate
        ? moment(record.completedDate)
        : null,
      newsArticles: record.newsArticles || [],
      products: record.products || [],
      policyTemplates: record.policyTemplates || [],
      policies: record.policies || [],
      attachments: record.attachments || [],
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

  const {
    saveLoading,
    modal,
    isEditing,
    title,
    hiddenImpossibleFields,
  } = props;

  const makeFormButtons = (modal = false) => {
    return (
      <FormButtons
        style={{
          flexDirection: 'row-reverse',
          margin: modal ? 0 : undefined,
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
              <NewTaskLayout
                title={title}
                initialValues={{ ...initialValues }}
                hiddenImpossibleFields={
                  hiddenImpossibleFields
                }
                record={props.record}
                modal
              />
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
                      <NewTaskLayout
                        title={title}
                        initialValues={{ ...initialValues }}
                        hiddenImpossibleFields={
                          hiddenImpossibleFields
                        }
                        modal
                      />
                      <MDBox p={0.8}>
                        {makeFormButtons(true)}
                      </MDBox>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            ))}
          {isEditing && !modal && (
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDTypography variant="h4">
                {i18n('entities.task.edit.title')}
              </MDTypography>
              {makeFormButtons(false)}
            </MDBox>
          )}
          {isEditing && modal && (
            <GradientTitle>
              {i18n('entities.task.edit.title')}
            </GradientTitle>
          )}
          {isEditing && (
            <EditTaskLayout
              title={title}
              initialValues={{ ...initialValues }}
              hiddenImpossibleFields={
                hiddenImpossibleFields
              }
              record={props.record}
              modal
            />
          )}
          {modal && (
            <MDBox mt={1.6}>{makeFormButtons(modal)}</MDBox>
          )}
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default TaskForm;
