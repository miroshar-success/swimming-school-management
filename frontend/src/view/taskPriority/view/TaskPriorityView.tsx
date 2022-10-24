import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TaskPriorityListItem from 'src/view/taskPriority/list/TaskPriorityListItem';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import { Grid } from '@mui/material';
import CreationInfo from 'src/view/shared/view/CreationInfo';

function TaskPriorityView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid xs={12} item>
          <CustomViewItem
            label={i18n(
              'entities.taskPriority.fields.priority',
            )}
            value={[record]}
            render={(values) =>
              values.map((value) => (
                <TaskPriorityListItem
                  key={value}
                  value={value}
                />
              ))
            }
          />
        </Grid>
        <Grid xs={12} item>
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

export default TaskPriorityView;
