import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import moment from 'moment';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserViewItem from 'src/view/user/view/UserViewItem';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';

function CreationInfo(props) {
  const { record } = props;
  return (
    <Grid spacing={1.6} container>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <UserViewItem
          label={i18n('common.createdBy')}
          value={record.createdBy}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextViewItem
          label={i18n('common.createdAt')}
          value={moment(record.createdAt).format(
            DEFAULT_MOMENT_FORMAT,
          )}
        />
      </Grid>
    </Grid>
  );
}

export default CreationInfo;
