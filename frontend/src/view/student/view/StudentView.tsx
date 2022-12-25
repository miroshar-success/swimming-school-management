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
import StudentStatusView from 'src/view/student/view/StudentStatusView';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import MDTypography from 'src/mui/components/MDTypography';
import lessonEnumerators from 'src/modules/lesson/lessonEnumerators';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
          <MDBox p={2.4}>
            <Grid container spacing={1.6}>
              <Grid item md={12}>
                <MDBox
                  display="flex"
                  justifyContent="center"
                >
                  <LogoViewItem
                    value={student.avatars}
                    hiddenLabel
                  />
                </MDBox>
              </Grid>
              <Grid item md={4} xs={12}>
                <TextViewItem
                  label={i18n(
                    'student.fields.studentNumber',
                  )}
                  value={student.studentNumber}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextViewItem
                  label={i18n('student.fields.name')}
                  value={student.fullName}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item md={8} xs={12}>
        <Grid container spacing={1.6}>
          <Grid item md={12}>
            <Card>
              <MDBox p={2.4}>
                <Grid container spacing={1.6}>
                  <Grid item md={3} xs={12}>
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
                      value={student.lessons[0]?.class.name}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <TextViewItem
                      label={i18n(
                        'student.fields.nextPaymentDate',
                      )}
                      value={paymentDate}
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <MDBox pt={1}>
                      <StudentStatusView
                        value={student.status}
                      />
                    </MDBox>
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
                    <MDBox pt={2}>
                      <Grid container spacing={1.6}>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'student.fields.email',
                            )}
                            value={student.email}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'student.fields.phoneNumber',
                            )}
                            value={student.phoneNumber}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'student.fields.bloodType',
                            )}
                            value={student.bloodType}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'student.fields.sex',
                            )}
                            value={student.sex}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'student.fields.birthday',
                            )}
                            value={moment(
                              student.birthday,
                            ).format(
                              DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                            )}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'student.fields.RFC',
                            )}
                            value={student.RFC}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'student.fields.CURP',
                            )}
                            value={student.CURP}
                          />
                        </Grid>
                        {student.guardianFullName && (
                          <Grid item md={4} xs={12}>
                            <TextViewItem
                              label={i18n(
                                'student.fields.guardianFullName',
                              )}
                              value={
                                student.guardianFullName
                              }
                            />
                          </Grid>
                        )}
                        {student.guardianPhoneNumber && (
                          <Grid item md={4} xs={12}>
                            <TextViewItem
                              label={i18n(
                                'student.fields.guardianPhoneNumber',
                              )}
                              value={
                                student.guardianPhoneNumber
                              }
                            />
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          <TextViewItem
                            label={i18n(
                              'student.fields.comment',
                            )}
                            value={student.comment}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                  </TabPanel>
                  <TabPanel value="schedules">
                    <MDBox
                      pt={2}
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <Grid container spacing={1.6}>
                        <Grid item md={6} xs={12}>
                          <MDTypography variant="h4">
                            {student.lessons[0]?.class.name}
                          </MDTypography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <MDBox
                            color="white"
                            sx={{ fontSize: '12px' }}
                          >
                            {
                              student.lessons[0]?.class.pool
                                ?.name
                            }
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                    <MDBox p={2}>
                      {student.lessons.map(
                        (lesson, index) => (
                          <Grid
                            container
                            spacing={1.6}
                            key={index}
                          >
                            <Grid item md={1} xs={4}>
                              <CheckCircleIcon
                                fontSize="large"
                                color="success"
                              />
                            </Grid>
                            <Grid item md={3} xs={8}>
                              <MDTypography>
                                {
                                  lessonEnumerators.day[
                                    lesson.day
                                  ]
                                }
                              </MDTypography>
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <MDTypography>
                                {moment(lesson.time).format(
                                  'LT',
                                ) +
                                  ' ~ ' +
                                  moment(lesson.time)
                                    .add(
                                      lesson.class.duration,
                                      'minutes',
                                    )
                                    .format('LT')}
                              </MDTypography>
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <MDTypography>
                                {lesson.teacher.fullName}
                              </MDTypography>
                            </Grid>
                          </Grid>
                        ),
                      )}
                    </MDBox>
                  </TabPanel>
                  <TabPanel value="attendance">
                    <MDBox
                      pt={2}
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <MDTypography>
                        {i18n(
                          'student.fields.attendanceHistory',
                        )}
                      </MDTypography>
                    </MDBox>
                    <MDBox p={2}>
                      {student.attendances.map(
                        (attendance, index) => (
                          <Grid
                            container
                            spacing={1.6}
                            key={index}
                          >
                            <Grid item md={4} xs={12}>
                              <MDTypography>
                                {
                                  attendance.lesson.class
                                    ?.name
                                }
                              </MDTypography>
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <MDTypography>
                                {attendance.time}
                              </MDTypography>
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <MDTypography>
                                <CheckCircleIcon
                                  fontSize="large"
                                  color="success"
                                />
                              </MDTypography>
                            </Grid>
                          </Grid>
                        ),
                      )}
                    </MDBox>
                  </TabPanel>
                  <TabPanel value="payment">
                    <MDBox
                      pt={2}
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <MDTypography>
                        {i18n('payment.history.title')}
                      </MDTypography>
                    </MDBox>
                    <MDBox pt={2}>
                      <TableContainer
                        sx={{ boxShadow: 'none' }}
                      >
                        <Table>
                          <MDBox component="thead">
                            <TableRow>
                              <DataTableHeadCell
                                sorted={false}
                              >
                                {i18n(
                                  'payment.fields.paymentCategory',
                                )}
                              </DataTableHeadCell>
                              <DataTableHeadCell
                                sorted={false}
                              >
                                {i18n(
                                  'payment.fields.paymentMethod',
                                )}
                              </DataTableHeadCell>
                              <DataTableHeadCell
                                sorted={false}
                              >
                                {i18n(
                                  'payment.fields.paymentDate',
                                )}
                              </DataTableHeadCell>
                              <DataTableHeadCell
                                sorted={false}
                              >
                                {i18n(
                                  'payment.fields.amount',
                                )}
                              </DataTableHeadCell>
                              <DataTableHeadCell
                                sorted={false}
                              >
                                {i18n('payment.fields.VAT')}
                              </DataTableHeadCell>
                              <DataTableHeadCell
                                sorted={false}
                              >
                                {i18n(
                                  'payment.fields.cost',
                                )}
                              </DataTableHeadCell>
                            </TableRow>
                          </MDBox>
                          <TableBody>
                            {student.payments.length ===
                              0 && (
                              <TableRow>
                                <DataTableBodyCell
                                  align="center"
                                  colSpan={100}
                                >
                                  <MDTypography>
                                    {i18n('table.noData')}
                                  </MDTypography>
                                </DataTableBodyCell>
                              </TableRow>
                            )}
                            {student.payments.map(
                              (payment, index) => (
                                <TableRow key={index}>
                                  <DataTableBodyCell>
                                    {payment.category?.name}
                                  </DataTableBodyCell>
                                  <DataTableBodyCell>
                                    {
                                      payment.paymentMethod
                                        ?.name
                                    }
                                  </DataTableBodyCell>
                                  <DataTableBodyCell>
                                    {moment(
                                      payment.createdAt,
                                    ).format(
                                      DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                                    )}
                                  </DataTableBodyCell>
                                  <DataTableBodyCell>
                                    {payment.quantity *
                                      payment.price}
                                  </DataTableBodyCell>
                                  <DataTableBodyCell>
                                    {payment.VAT}
                                  </DataTableBodyCell>
                                  <DataTableBodyCell>
                                    {payment.cost}
                                  </DataTableBodyCell>
                                </TableRow>
                              ),
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </MDBox>
                  </TabPanel>
                  <TabPanel value="address">
                    <MDBox pt={2}>
                      <Grid container spacing={1.6}>
                        <Grid item xs={12}>
                          <TextViewItem
                            label={i18n(
                              'student.fields.street',
                            )}
                            value={student.street}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'student.fields.postalCode',
                            )}
                            value={student.postalCode}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'student.fields.cologne',
                            )}
                            value={student.cologne}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'student.fields.city',
                            )}
                            value={student.city}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                  </TabPanel>
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
