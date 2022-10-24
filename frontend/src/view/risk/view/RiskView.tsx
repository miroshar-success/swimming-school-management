import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NewsArticleViewItem from 'src/view/newsArticle/view/NewsArticleViewItem';
import NoteViewItem from 'src/view/note/view/NoteViewItem';
import PolicyTemplateViewItem from 'src/view/policyTemplate/view/PolicyTemplateViewItem';
import PolicyViewItem from 'src/view/policy/view/PolicyViewItem';
import ProductViewItem from 'src/view/product/view/ProductViewItem';
import RiskCategoryViewItem from 'src/view/riskCategory/view/RiskCategoryViewItem';
import RiskImpactViewItem from 'src/view/risk/view/RiskImpactViewItem';
import RiskInherentScoreViewItem from 'src/view/risk/view/RiskInherentScoreViewItem';
import RiskLikelihoodViewItem from 'src/view/risk/view/RiskLikelihoodViewItem';
import RiskService from 'src/modules/risk/riskService';
import RiskStatusViewItem from 'src/view/risk/view/RiskStatusViewItem';
import Spinner from 'src/view/shared/Spinner';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TaskViewItem from 'src/view/task/view/TaskViewItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserViewItem from 'src/view/user/view/UserViewItem';

function RiskView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid container spacing={1.6}>
        <Grid item md={8} xs={12}>
          <Card sx={{ height: '100%' }}>
            <MDBox position="relative" p={2.4}>
              <MDTypography
                position="absolute"
                top={0}
                right={0}
                p={1.6}
                textAlign="right"
                variant="button"
                color="text"
                fontWeight="bold"
              >{`# ${record.reference}`}</MDTypography>
              <Grid spacing={1.6} container>
                <Grid item md={6} xs={12}>
                  <MDTypography variant="h3">
                    {record.title}
                  </MDTypography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <RiskCategoryViewItem
                    label={i18n(
                      'entities.risk.fields.category',
                    )}
                    value={record.category}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.risk.fields.description',
                    )}
                    value={record.description}
                    multiline
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.risk.fields.status',
                    )}
                    value={[record.status]}
                    render={(values) =>
                      values.map((value) => (
                        <RiskStatusViewItem
                          key={value}
                          value={value}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <UserViewItem
                    label={i18n(
                      'entities.risk.fields.owner',
                    )}
                    value={record.owner}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.risk.fields.likelihood',
                    )}
                    value={[record.likelihood]}
                    render={(values) =>
                      values.map((value) => (
                        <RiskLikelihoodViewItem
                          key={value}
                          value={value}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.risk.fields.impact',
                    )}
                    value={[record.impact]}
                    render={(values) =>
                      values.map((value) => (
                        <RiskImpactViewItem
                          key={value}
                          value={value}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.risk.fields.inherentScore',
                    )}
                    value={[record.inherentScore]}
                    render={(value) =>
                      value.map((score) => (
                        <RiskInherentScoreViewItem
                          key={score}
                          value={score}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.risk.fields.residualScore',
                    )}
                    value={record.residualScore}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.risk.fields.cost',
                    )}
                    value={record.cost}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CreationInfo {...props} />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid height="100%" container>
            <Grid item xs={12} pb={1.6}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4}>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n('entities.risk.fields.tags')}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <TagAutocompleteForm
                        name="tags"
                        id={record.id}
                        handleService={RiskService.tags}
                        tags={record.tags}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4}>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n('entities.risk.fields.notes')}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <NoteViewItem
                        label={i18n(
                          'entities.risk.fields.notes',
                        )}
                        value={record.notes}
                        hiddenLabel
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ height: '100%' }}>
            <MDBox p={2.4}>
              <Grid container spacing={1.6}>
                <Grid item xs={12}>
                  <MDTypography variant="h5">
                    {i18n(
                      'entities.risk.fields.newsArticles',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <NewsArticleViewItem
                    label={i18n(
                      'entities.risk.fields.newsArticles',
                    )}
                    value={record.newsArticles}
                    hiddenLabel
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ height: '100%' }}>
            <MDBox p={2.4}>
              <Grid container spacing={1.6}>
                <Grid item xs={12}>
                  <MDTypography variant="h5">
                    {i18n('entities.risk.fields.products')}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <ProductViewItem
                    label={i18n(
                      'entities.risk.fields.products',
                    )}
                    value={record.products}
                    hiddenLabel
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ height: '100%' }}>
            <MDBox p={2.4}>
              <Grid container spacing={1.6}>
                <Grid item xs={12}>
                  <MDTypography variant="h5">
                    {i18n(
                      'entities.risk.fields.policyTemplates',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <PolicyTemplateViewItem
                    label={i18n(
                      'entities.risk.fields.policyTemplates',
                    )}
                    value={record.policyTemplates}
                    hiddenLabel
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ height: '100%' }}>
            <MDBox p={2.4}>
              <Grid container spacing={1.6}>
                <Grid item xs={12}>
                  <MDTypography variant="h5">
                    {i18n('entities.risk.fields.policies')}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <PolicyViewItem
                    label={i18n(
                      'entities.risk.fields.policies',
                    )}
                    value={record.policies}
                    hiddenLabel
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <MDBox p={2.4}>
              <Grid spacing={1.6} container>
                <Grid item xs={12}>
                  <MDTypography variant="h5">
                    {i18n(
                      'entities.risk.fields.attachments',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <FilesViewItem
                    label={i18n(
                      'entities.risk.fields.attachments',
                    )}
                    value={record.attachments}
                    hiddenLabel
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card id="tasks-on-risk">
            <MDBox p={2.4} pb={0}>
              <TaskViewItem value={record.tasks} />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default RiskView;
