import { Card, Grid } from '@mui/material';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function DocumentView(props) {
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
                label={i18n('document.fields.description')}
                value={record.description}
                multiline
              />
            </Grid>
            <Grid xs={12} item>
              <TextViewItem
                label={i18n('document.fields.lastUpdated')}
                value={
                  record.lastUpdated
                    ? moment(record.lastUpdated).format(
                        DEFAULT_MOMENT_FORMAT,
                      )
                    : null
                }
              />
            </Grid>
            <Grid xs={12} item>
              <FilesViewItem
                label={i18n('document.fields.attachment')}
                value={record.attachment}
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

export default DocumentView;
