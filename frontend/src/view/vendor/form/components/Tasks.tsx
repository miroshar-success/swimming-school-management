import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import TaskAutocompleteFormItem from 'src/view/task/autocomplete/TaskAutocompleteFormItem';

function TasksSection({ visible }): JSX.Element {
  return (
    <MDBox display={visible ? 'block' : 'none'}>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">
          {i18n('entities.vendor.sections.tasks')}
        </MDTypography>
      </MDBox>
      <MDBox mt={1.3}>
        <Grid spacing={1.6} container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TaskAutocompleteFormItem
              name="tasks"
              label={i18n('entities.vendor.fields.tasks')}
              required={false}
              showCreate={true}
              variant="standard"
              mode="multiple"
              fullWidth
              autoFocus
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default TasksSection;
