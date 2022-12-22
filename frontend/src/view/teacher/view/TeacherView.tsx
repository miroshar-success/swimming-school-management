import {
  Grid,
  Card,
  Tab,
  TableContainer,
  TableRow,
  TableBody,
  Table,
} from '@mui/material';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBox from 'src/mui/components/MDBox';
import Roles from 'src/security/roles';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import TeacherStatusView from 'src/view/teacher/view/TeacherStatusView';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import MDTypography from 'src/mui/components/MDTypography';
import lessonEnumerators from 'src/modules/lesson/lessonEnumerators';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function TeacherView(props) {
  const { teacher, lessons, loading } = props;
  const { sidenavColor } = selectMuiSettings();
  const [tabIndex, setTabIndex] = useState('general');
  const [paymentDate] = useState(() => {
    const date = new Date().getDate();
    if (date <= 5)
      return moment()
        .set('date', 5)
        .format(DEFAULT_MOMENT_FORMAT_DATE_ONLY);
    else
      return moment()
        .add(1, 'months')
        .set('date', 5)
        .format(DEFAULT_MOMENT_FORMAT_DATE_ONLY);
  });

  if (loading || !teacher) {
    return <Spinner />;
  }

  const changeTabs = (
    event: React.SyntheticEvent,
    newValue: string,
  ) => {
    setTabIndex(newValue);
  };

  console.log(teacher);
  console.log(lessons);

  return (
    <Grid container spacing={1.6} mb={4.8}>
      <Grid item md={3} xs={12}>
        <Card>
          <MDBox p={2.4}>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="center"
                >
                  <LogoViewItem
                    value={teacher.avatars}
                    hiddenLabel
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <TextViewItem
                  label={i18n('teacher.fields.name')}
                  value={teacher.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextViewItem
                  label={i18n('teacher.fields.birthday')}
                  value={moment(teacher.birthday).format(
                    DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextViewItem
                  label={i18n('teacher.fields.RFC')}
                  value={teacher.RFC}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextViewItem
                  label={i18n('teacher.fields.CURP')}
                  value={teacher.CURP}
                />
              </Grid>
              <Grid item xs={12}>
                <TextViewItem
                  label={i18n('teacher.fields.comment')}
                  value={teacher.comment}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item md={9} xs={12}>
        <Card>
          <MDBox p={2.4}></MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default TeacherView;
