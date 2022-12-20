import { Grid, Card, Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import MDBox from 'src/mui/components/MDBox';
import Roles from 'src/security/roles';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import StudentStatusView from 'src/view/student/view/StudentStatusView';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';

function StudentView(props) {
  const { student, loading } = props;
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

  if (loading || !student) {
    return <Spinner />;
  }

  const changeTabs = (
    event: React.SyntheticEvent,
    newValue: string,
  ) => {
    setTabIndex(newValue);
  };

  console.log(student);

  return (
    <Grid container spacing={1.6} mb={4.8}>
      <Grid item md={4} xs={12}>
        <Card>
          <MDBox
            display="flex"
            justifyContent="center"
            p={2.4}
          >
            <LogoViewItem
              label={i18n('student.fields.avatars')}
              value={student.avatars}
            />
          </MDBox>
        </Card>
      </Grid>
      <Grid item md={8} xs={12}>
        <Grid container spacing={1.6}>
          <Grid item md={12}>
            <Card>
              <MDBox p={2.4}>
                <Grid container spacing={1.6}>
                  <Grid item md={4} xs={12}>
                    <TextViewItem
                      label={i18n(
                        'student.fields.registrationDate',
                      )}
                      value={moment(
                        student.createdAt,
                      ).format(
                        DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                      )}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextViewItem
                      label={i18n('student.fields.class')}
                      value={student.lessons[0].class.name}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextViewItem
                      label={i18n(
                        'student.fields.nextPaymentDate',
                      )}
                      value={paymentDate}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item md={12}>
            <Card>
              <MDBox p={2.4}>
                <TabContext value={tabIndex}>
                  <MDBox
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <TabList onChange={changeTabs}>
                      <Tab
                        label={i18n(
                          'student.fields.generalInfo',
                        )}
                        value="general"
                      />
                      <Tab
                        label={i18n(
                          'student.fields.schedules',
                        )}
                        value="schedules"
                      />
                      <Tab
                        label={i18n(
                          'student.fields.paymentList',
                        )}
                        value="payment"
                      />
                      <Tab
                        label={i18n(
                          'student.fields.attendance',
                        )}
                        value="attendance"
                      />
                      <Tab
                        label={i18n(
                          'student.fields.address',
                        )}
                        value="address"
                      />
                    </TabList>
                  </MDBox>
                  <TabPanel value="general">
                    faewfesfwefew
                  </TabPanel>
                  <TabPanel value="schedules">
                    fwefewfwe
                  </TabPanel>
                  <TabPanel value="payment">
                    fwefwe
                  </TabPanel>
                  <TabPanel value="attendance">
                    fwefew
                  </TabPanel>
                  <TabPanel value="address">wfewf</TabPanel>
                </TabContext>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StudentView;
