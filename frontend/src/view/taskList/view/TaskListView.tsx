import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { Grid } from '@mui/material';
import CreationInfo from 'src/view/shared/view/CreationInfo';

function TaskListView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n('entities.taskList.fields.name')}
            value={record.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n(
              'entities.taskList.fields.taskdisplaycolor',
            )}
            value={
              record.taskdisplaycolor &&
              i18n(
                `entities.taskList.enumerators.taskdisplaycolor.${record.taskdisplaycolor}`,
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CreationInfo {...props} />
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

export default TaskListView;
