import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import documentFormActions from 'src/modules/document/form/documentFormActions';
import documentFormSelectors from 'src/modules/document/form/documentFormSelectors';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import formActions from 'src/modules/form/formActions';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import SaveIcon from '@mui/icons-material/Save';
import Storage from 'src/security/storage';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import documentListActions from 'src/modules/document/list/documentListActions';

const schema = yup.object().shape({
  files: yupFormSchemas.files(
    i18n('entities.document.fields.files'),
  ),
});

function DocumentForm(props) {
  const { sidenavColor } = selectMuiSettings();

  const [visiableSaveButton, setVisibleSaveButton] =
    useState(false);

  const saveLoading = useSelector(
    documentFormSelectors.selectSaveLoading,
  );

  const dispatch = useDispatch();

  const [initialValues] = useState({
    files: [],
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    dispatch(
      documentFormActions.doSave(values, () => {
        onReset();
        setVisibleSaveButton(false);
        dispatch(
          documentListActions.doFetchCurrentFilter(),
        );
      }),
    );
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  return (
    <Card>
      <MDBox p={2.4}>
        <FormWrapper>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container spacing={1.6}>
                <Grid item xs={12}>
                  <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <MDTypography variant="h5">
                      {i18n(
                        'entities.document.fields.files',
                      )}
                    </MDTypography>
                    {visiableSaveButton && (
                      <MDButton
                        variant="gradient"
                        color={sidenavColor}
                        disabled={saveLoading}
                        type="submit"
                        onClick={form.handleSubmit(
                          onSubmit,
                        )}
                        startIcon={<SaveIcon />}
                        size="small"
                      >
                        {i18n('common.save')}
                      </MDButton>
                    )}
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <FilesFormItem
                    name="files"
                    onChange={(files) =>
                      setVisibleSaveButton(
                        files && files.length > 0,
                      )
                    }
                    storage={Storage.values.document}
                  />
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </FormWrapper>
      </MDBox>
    </Card>
  );
}

export default DocumentForm;
