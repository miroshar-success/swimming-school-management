import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDButton from 'src/mui/components/MDButton';
import NewsArticleAutocompleteFormItem from 'src/view/newsArticle/autocomplete/NewsArticleAutocompleteFormItem';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { useDispatch } from 'react-redux';
import formActions from 'src/modules/form/formActions';

const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(
    i18n('entities.newsFavorite.fields.user'),
    {
      required: true,
    },
  ),
  newsArticle: yupFormSchemas.relationToOne(
    i18n('entities.newsFavorite.fields.newsArticle'),
    {
      required: true,
    },
  ),
});

function NewsFavoriteForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      user: record.user,
      newsArticle: record.newsArticle,
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
              <UserAutocompleteFormItem
                name="user"
                label={i18n(
                  'entities.newsFavorite.fields.user',
                )}
                variant="standard"
                required={true}
                showCreate={true}
              />
            </Grid>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <NewsArticleAutocompleteFormItem
                name="newsArticle"
                label={i18n(
                  'entities.newsFavorite.fields.newsArticle',
                )}
                variant="standard"
                required={true}
                showCreate={true}
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

export default NewsFavoriteForm;
