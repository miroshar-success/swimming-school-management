import { Card, Grid } from '@mui/material';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import NewsArticleService from 'src/modules/newsArticle/newsArticleService';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';

function NewsArticleView(props) {
  const { record } = props;

  return (
    <Grid container spacing={1.6}>
      <Grid md={7} xs={12} item>
        <Card sx={{ height: '100%' }}>
          <MDBox p={2.4}>
            <Grid spacing={1.6} container>
              <Grid xs={12} item>
                <MDTypography variant="h3">
                  {record.title}
                </MDTypography>
              </Grid>
              <Grid xs={12} item>
                <TextViewItem
                  label={i18n(
                    'entities.newsArticle.fields.link',
                  )}
                  value={record.link}
                />
              </Grid>
              <Grid xs={12} item>
                <TextViewItem
                  label={i18n(
                    'entities.newsArticle.fields.description',
                  )}
                  value={record.description}
                  multiline
                />
              </Grid>
              <Grid xs={12} item>
                <TextViewItem
                  label={i18n(
                    'entities.newsArticle.fields.image',
                  )}
                  value={record.image}
                />
              </Grid>
              <Grid xs={12} item>
                <TextViewItem
                  label={i18n(
                    'entities.newsArticle.fields.plainDescription',
                  )}
                  value={record.plainDescription}
                  multiline
                />
              </Grid>
              <Grid md={6} xs={12} item>
                <TextViewItem
                  label={i18n(
                    'entities.newsArticle.fields.author',
                  )}
                  value={record.author}
                />
              </Grid>
              <Grid md={6} xs={12} item>
                <TextViewItem
                  label={i18n(
                    'entities.newsArticle.fields.date',
                  )}
                  value={moment(record.date).format(
                    DEFAULT_MOMENT_FORMAT,
                  )}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid md={5} xs={12} item>
        <Grid spacing={1.6} container>
          <Grid xs={12} item>
            <Card>
              <MDBox p={2.4}>
                <Grid spacing={1.6} container>
                  <Grid xs={12} item>
                    <MDTypography variant="h5">
                      {i18n(
                        'entities.newsArticle.fields.tags',
                      )}
                    </MDTypography>
                  </Grid>
                  <Grid xs={12} item>
                    <TagAutocompleteForm
                      name="tags"
                      id={record.id}
                      tags={record.tags}
                      handleService={
                        NewsArticleService.tags
                      }
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid xs={12} item>
            <Card>
              <MDBox p={2.4}>
                <Grid spacing={1.6} container>
                  <Grid item xs={12}>
                    <MDTypography variant="h5">
                      {i18n('entities.newsArticle.rss')}
                    </MDTypography>
                  </Grid>
                  <Grid xs={12} item>
                    <TextViewItem
                      label={i18n(
                        'entities.newsArticle.fields.rssid',
                      )}
                      value={record.rssid}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextViewItem
                      label={i18n(
                        'entities.newsArticle.fields.feedURL',
                      )}
                      value={record.feedURL}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextViewItem
                      label={i18n(
                        'entities.newsArticle.fields.feedLink',
                      )}
                      value={record.feedLink}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextViewItem
                      label={i18n(
                        'entities.newsArticle.fields.feedTitle',
                      )}
                      value={record.feedTitle}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextViewItem
                      label={i18n(
                        'entities.newsArticle.fields.feedDescription',
                      )}
                      value={record.feedDescription}
                      multiline
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextViewItem
                      label={i18n(
                        'entities.newsArticle.fields.feedIcon',
                      )}
                      value={record.feedIcon}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NewsArticleView;
