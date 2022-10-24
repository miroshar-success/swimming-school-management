import { Card, Grid } from '@mui/material';
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
import moment from 'moment';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import EditNewsArticleLayout from 'src/view/newsArticle/form/EditNewsArticleLayout';
import NewNewsArticleLayout from 'src/view/newsArticle/form/NewNewsArticleLayout';
import formActions from 'src/modules/form/formActions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  rssid: yupFormSchemas.string(
    i18n('entities.newsArticle.fields.rssid'),
    {
      required: true,
      min: 1,
      max: 50,
    },
  ),
  feedURL: yupFormSchemas.string(
    i18n('entities.newsArticle.fields.feedURL'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  feedLink: yupFormSchemas.string(
    i18n('entities.newsArticle.fields.feedLink'),
    {
      required: true,
      min: 1,
      max: 200,
    },
  ),
  feedTitle: yupFormSchemas.string(
    i18n('entities.newsArticle.fields.feedTitle'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  feedDescription: yupFormSchemas.string(
    i18n('entities.newsArticle.fields.feedDescription'),
    {},
  ),
  feedIcon: yupFormSchemas.string(
    i18n('entities.newsArticle.fields.feedIcon'),
    {
      required: true,
      min: 1,
      max: 200,
    },
  ),
  title: yupFormSchemas.string(
    i18n('entities.newsArticle.fields.title'),
    {
      required: true,
      min: 1,
      max: 500,
    },
  ),
  link: yupFormSchemas.string(
    i18n('entities.newsArticle.fields.link'),
    {
      required: true,
      min: 1,
      max: 1000,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.newsArticle.fields.description'),
    {
      required: true,
      min: 1,
      max: 2500,
    },
  ),
  image: yupFormSchemas.string(
    i18n('entities.newsArticle.fields.image'),
    {
      max: 1000,
    },
  ),
  plainDescription: yupFormSchemas.string(
    i18n('entities.newsArticle.fields.plainDescription'),
    {
      max: 2500,
    },
  ),
  author: yupFormSchemas.string(
    i18n('entities.newsArticle.fields.author'),
    {
      max: 250,
    },
  ),
  date: yupFormSchemas.datetime(
    i18n('entities.newsArticle.fields.date'),
    {
      required: true,
    },
  ),
  tags: yupFormSchemas.relationToMany(
    i18n('entities.newsArticle.fields.tags'),
    {},
  ),
});

function NewsArticleForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      rssid: record.rssid,
      feedURL: record.feedURL,
      feedLink: record.feedLink,
      feedTitle: record.feedTitle,
      feedDescription: record.feedDescription,
      feedIcon: record.feedIcon,
      title: record.title,
      link: record.link,
      description: record.description,
      image: record.image,
      plainDescription: record.plainDescription,
      author: record.author,
      date: record.date ? moment(record.date) : null,
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
              <NewNewsArticleLayout modal />
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
                      <NewNewsArticleLayout modal />
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
                {i18n('entities.newsArticle.edit.title')}
              </MDTypography>
              {makeFormButtons(true)}
            </MDBox>
          )}
          {!isEditing && modal && makeFormButtons(modal)}
          {isEditing && (
            <EditNewsArticleLayout
              initialValues={{ ...initialValues }}
              modal
            />
          )}
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default NewsArticleForm;
