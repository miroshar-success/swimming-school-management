import { Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import taskListEnumerators from 'src/modules/taskList/taskListEnumerators';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import formActions from 'src/modules/form/formActions';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.taskList.fields.name'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  taskdisplaycolor: yupFormSchemas.enumerator(
    i18n('entities.taskList.fields.taskdisplaycolor'),
    {
      required: true,
      options: taskListEnumerators.taskdisplaycolor,
    },
  ),
});

function TaskListForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      taskdisplaycolor: record.taskdisplaycolor,
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

  const { saveLoading, modal } = props;

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={1.6} container>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <InputFormItem
                name="name"
                label={i18n(
                  'entities.taskList.fields.name',
                )}
                variant="standard"
                required={true}
                autoFocus
              />
            </Grid>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <SelectFormItem
                name="taskdisplaycolor"
                label={i18n(
                  'entities.taskList.fields.taskdisplaycolor',
                )}
                options={taskListEnumerators.taskdisplaycolor.map(
                  (value) => ({
                    value,
                    label: i18n(
                      `entities.taskList.enumerators.taskdisplaycolor.${value}`,
                    ),
                  }),
                )}
                variant="standard"
                required={true}
              />
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

export default TaskListForm;
