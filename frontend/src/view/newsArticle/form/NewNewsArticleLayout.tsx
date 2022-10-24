import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';

function NewNewsArticleLayout(props) {
  const { title, hiddenImpossibleFields } = props;
  return (
    <MDBox px={0.8}>
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <GradientTitle>
            {title ??
              i18n('entities.newsArticle.new.title')}
          </GradientTitle>
        </Grid>
        <Grid item md={7} xs={12}>
          <Grid spacing={1.6} container>
            <Grid item xs={12}>
              <InputFormItem
                name="title"
                label={i18n(
                  'entities.newsArticle.fields.title',
                )}
                variant="standard"
                required={true}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                name="link"
                label={i18n(
                  'entities.newsArticle.fields.link',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextAreaFormItem
                name="description"
                label={i18n(
                  'entities.newsArticle.fields.description',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                name="image"
                label={i18n(
                  'entities.newsArticle.fields.image',
                )}
                variant="standard"
                required={false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextAreaFormItem
                name="plainDescription"
                label={i18n(
                  'entities.newsArticle.fields.plainDescription',
                )}
                variant="standard"
                required={false}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="author"
                label={i18n(
                  'entities.newsArticle.fields.author',
                )}
                variant="standard"
                required={false}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DatePickerFormItem
                name="date"
                label={i18n(
                  'entities.newsArticle.fields.date',
                )}
                variant="standard"
                required={true}
                showTime
              />
            </Grid>
            <Grid item xs={12}>
              <TagAutocompleteFormItem
                name="tags"
                label={i18n(
                  'entities.newsArticle.fields.tags',
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5} xs={12}>
          <Grid spacing={1.6} container>
            <Grid item xs={12}>
              <InputFormItem
                name="rssid"
                label={i18n(
                  'entities.newsArticle.fields.rssid',
                )}
                required={true}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                name="feedURL"
                label={i18n(
                  'entities.newsArticle.fields.feedURL',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                name="feedLink"
                label={i18n(
                  'entities.newsArticle.fields.feedLink',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                name="feedTitle"
                label={i18n(
                  'entities.newsArticle.fields.feedTitle',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextAreaFormItem
                name="feedDescription"
                label={i18n(
                  'entities.newsArticle.fields.feedDescription',
                )}
                variant="standard"
                required={false}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                name="feedIcon"
                label={i18n(
                  'entities.newsArticle.fields.feedIcon',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewNewsArticleLayout;
