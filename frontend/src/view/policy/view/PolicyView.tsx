import { Card, Grid } from '@mui/material';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import PolicyService from 'src/modules/policy/policyService';
import Spinner from 'src/view/shared/Spinner';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserViewItem from 'src/view/user/view/UserViewItem';

function PolicyView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Card sx={{ height: '100%' }}>
        <MDBox position="relative" p={2.4}>
          <Grid spacing={1.6} container>
            <Grid item md={6} xs={12}>
              <MDTypography variant="h3">
                {record.name}
              </MDTypography>
            </Grid>
            <Grid xs={12} item>
              <TextViewItem
                label={i18n('entities.policy.fields.type')}
                value={
                  record.type &&
                  i18n(
                    `entities.policy.enumerators.type.${record.type}`,
                  )
                }
              />
            </Grid>
            <Grid md={6} xs={12} item>
              <TextViewItem
                label={i18n(
                  'entities.policy.fields.lastPublishedDate',
                )}
                value={
                  record.lastPublishedDate
                    ? moment(
                        record.lastPublishedDate,
                      ).format(DEFAULT_MOMENT_FORMAT)
                    : null
                }
              />
            </Grid>
            <Grid md={6} xs={12} item>
              <UserViewItem
                label={i18n(
                  'entities.policy.fields.publishedBy',
                )}
                value={record.publishedBy}
              />
            </Grid>
            <Grid xs={12} item>
              <FilesViewItem
                label={i18n(
                  'entities.policy.fields.attachment',
                )}
                value={record.attachment}
              />
            </Grid>
            <Grid xs={12} item>
              <TextViewItem
                label={i18n('entities.policy.fields.link')}
                value={record.link}
              />
            </Grid>
            <Grid xs={12} item>
              <TagAutocompleteForm
                name="tags"
                label={i18n('entities.policy.fields.tags')}
                id={record.id}
                handleService={PolicyService.tags}
                tags={record.tags}
              />
            </Grid>
            <Grid xs={12} item>
              <CreationInfo {...props} />
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default PolicyView;
