import { Card, Grid } from '@mui/material';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { getAbsoluteDateTimeByHour } from 'src/modules/utils';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import NewsArticleViewItem from 'src/view/newsArticle/view/NewsArticleViewItem';
import NoteViewItem from 'src/view/note/view/NoteViewItem';
import PolicyTemplateViewItem from 'src/view/policyTemplate/view/PolicyTemplateViewItem';
import PolicyViewItem from 'src/view/policy/view/PolicyViewItem';
import ProductViewItem from 'src/view/product/view/ProductViewItem';
import Spinner from 'src/view/shared/Spinner';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TaskInstanceService from 'src/modules/taskInstance/taskInstanceService';
import TaskListViewItem from 'src/view/taskList/view/TaskListViewItem';
import TaskPriorityViewItem from 'src/view/taskPriority/view/TaskPriorityViewItem';
import TaskService from 'src/modules/task/taskService';
import TaskStatusViewItem from 'src/view/task/view/TaskStatusViewItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserViewItem from 'src/view/user/view/UserViewItem';

function TaskView(props) {
  const renderView = () => {
    const { record, isInstance } = props;

    return (
      <Grid container spacing={1.6}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <MDTypography variant="h3">
                    {record.title}
                  </MDTypography>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TaskListViewItem
                    label={i18n(
                      'entities.task.fields.taskList',
                    )}
                    value={record.taskList}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.task.fields.description',
                    )}
                    value={record.description}
                    multiline
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.task.fields.status',
                    )}
                    value={[record.status]}
                    render={(values) =>
                      values.map((value) => (
                        <TaskStatusViewItem
                          key={value}
                          value={value}
                        />
                      ))
                    }
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TaskPriorityViewItem
                    label={i18n(
                      'entities.task.fields.priority',
                    )}
                    value={record.priority}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <UserViewItem
                    label={i18n(
                      'entities.task.fields.owner',
                    )}
                    value={record.owner}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <UserViewItem
                    label={i18n(
                      'entities.task.fields.approver',
                    )}
                    value={record.approver}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.task.fields.dueDate',
                    )}
                    value={moment(
                      getAbsoluteDateTimeByHour(
                        record.dueDate,
                      ),
                    ).format(DEFAULT_MOMENT_FORMAT)}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <CustomViewItem
                    label={i18n(
                      'entities.task.fields.repeat',
                    )}
                    value={[record.repeat]}
                    render={(values) =>
                      values.map((value) => (
                        <MDTypography
                          key={value}
                          variant="button"
                          fontWeight={
                            record.repeat === 'Never'
                              ? 'regular'
                              : 'bold'
                          }
                        >
                          {record.repeat &&
                            i18n(
                              `entities.task.enumerators.repeat.${record.repeat}`,
                            )}
                        </MDTypography>
                      ))
                    }
                  />
                </Grid>

                {record.status === 'Complete' && (
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextViewItem
                      label={i18n(
                        'entities.task.fields.completedDate',
                      )}
                      value={moment(
                        record.completedDate,
                      ).format(DEFAULT_MOMENT_FORMAT)}
                    />
                  </Grid>
                )}
                <Grid xs={12} item>
                  <CreationInfo {...props} />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Grid height="100%" container>
            <Grid item xs={12} pb={1.6}>
              <Card sx={{ height: '100%' }}>
                <MDBox p={2.4}>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDTypography variant="h5">
                        {i18n('entities.task.fields.tags')}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <TagAutocompleteForm
                        name="tags"
                        id={record.id}
                        handleService={
                          isInstance
                            ? TaskInstanceService.tags
                            : TaskService.tags
                        }
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
                        {i18n('entities.task.fields.notes')}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <NoteViewItem
                        label={i18n(
                          'entities.task.fields.notes',
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
                      'entities.task.fields.newsArticles',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <NewsArticleViewItem
                    label={i18n(
                      'entities.task.fields.newsArticles',
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
                    {i18n('entities.task.fields.products')}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <ProductViewItem
                    label={i18n(
                      'entities.task.fields.products',
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
                      'entities.task.fields.policyTemplates',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <PolicyTemplateViewItem
                    label={i18n(
                      'entities.task.fields.policyTemplates',
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
                    {i18n('entities.task.fields.policies')}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <PolicyViewItem
                    label={i18n(
                      'entities.task.fields.policies',
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
                      'entities.task.fields.attachments',
                    )}
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <FilesViewItem
                    label={i18n(
                      'entities.task.fields.attachments',
                    )}
                    value={record.attachments}
                    hiddenLabel
                  />
                </Grid>
              </Grid>
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

export default TaskView;
