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
  const { teacher, loading } = props;
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
                    value={teacher.avatars}
                    hiddenLabel
                  />
                </MDBox>
              </Grid>
              <Grid item md={4} xs={12}>
                <TextViewItem
                  label={i18n(
                    'teacher.fields.teacherNumber',
                  )}
                  value={teacher.teacherNumber}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextViewItem
                  label={i18n('teacher.fields.name')}
                  value={teacher.fullName}
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
                        'teacher.fields.registrationDate',
                      )}
                      value={moment(
                        teacher.createdAt,
                      ).format(
                        DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                      )}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextViewItem
                      label={i18n('teacher.fields.class')}
                      value={teacher.lessons[0].class.name}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <TextViewItem
                      label={i18n(
                        'teacher.fields.nextPaymentDate',
                      )}
                      value={paymentDate}
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <MDBox pt={1}>
                      <TeacherStatusView
                        value={teacher.status}
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
                          'teacher.fields.generalInfo',
                        )}
                        value="general"
                      />
                      <Tab
                        label={i18n(
                          'teacher.fields.schedules',
                        )}
                        value="schedules"
                      />
                      <Tab
                        label={i18n(
                          'teacher.fields.paymentList',
                        )}
                        value="payment"
                      />
                      <Tab
                        label={i18n(
                          'teacher.fields.attendance',
                        )}
                        value="attendance"
                      />
                      <Tab
                        label={i18n(
                          'teacher.fields.address',
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
                              'teacher.fields.email',
                            )}
                            value={teacher.email}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'teacher.fields.phoneNumber',
                            )}
                            value={teacher.phoneNumber}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'teacher.fields.bloodType',
                            )}
                            value={teacher.bloodType}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'teacher.fields.sex',
                            )}
                            value={teacher.sex}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'teacher.fields.birthday',
                            )}
                            value={moment(
                              teacher.birthday,
                            ).format(
                              DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                            )}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'teacher.fields.RFC',
                            )}
                            value={teacher.RFC}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'teacher.fields.CURP',
                            )}
                            value={teacher.CURP}
                          />
                        </Grid>
                        {teacher.guardianFullName && (
                          <Grid item md={4} xs={12}>
                            <TextViewItem
                              label={i18n(
                                'teacher.fields.guardianFullName',
                              )}
                              value={
                                teacher.guardianFullName
                              }
                            />
                          </Grid>
                        )}
                        {teacher.guardianPhoneNumber && (
                          <Grid item md={4} xs={12}>
                            <TextViewItem
                              label={i18n(
                                'teacher.fields.guardianPhoneNumber',
                              )}
                              value={
                                teacher.guardianPhoneNumber
                              }
                            />
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          <TextViewItem
                            label={i18n(
                              'teacher.fields.comment',
                            )}
                            value={teacher.comment}
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
                            {teacher.lessons[0].class.name}
                          </MDTypography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <MDBox
                            color="white"
                            sx={{ fontSize: '12px' }}
                          >
                            {
                              teacher.lessons[0].class.pool
                                ?.name
                            }
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                    <MDBox p={2}>
                      {teacher.lessons.map(
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
                          'teacher.fields.attendanceHistory',
                        )}
                      </MDTypography>
                    </MDBox>
                    <MDBox p={2}>
                      {teacher.attendances.map(
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
                        {i18n(
                          'teacher.fields.paymentHistory',
                        )}
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
                                  'teacher.fields.paymentCategory',
                                )}
                              </DataTableHeadCell>
                              <DataTableHeadCell
                                sorted={false}
                              >
                                {i18n(
                                  'teacher.fields.paymentMethod',
                                )}
                              </DataTableHeadCell>
                              <DataTableHeadCell
                                sorted={false}
                              >
                                {i18n(
                                  'teacher.fields.paymentDate',
                                )}
                              </DataTableHeadCell>
                              <DataTableHeadCell
                                sorted={false}
                              >
                                {i18n(
                                  'teacher.fields.subTotal',
                                )}
                              </DataTableHeadCell>
                              <DataTableHeadCell
                                sorted={false}
                              >
                                {i18n('teacher.fields.VAT')}
                              </DataTableHeadCell>
                              <DataTableHeadCell
                                sorted={false}
                              >
                                {i18n(
                                  'teacher.fields.total',
                                )}
                              </DataTableHeadCell>
                            </TableRow>
                          </MDBox>
                          <TableBody>
                            {teacher.payments.length ===
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
                            {teacher.payments.map(
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
                              'teacher.fields.street',
                            )}
                            value={teacher.street}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'teacher.fields.postalCode',
                            )}
                            value={teacher.postalCode}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'teacher.fields.cologne',
                            )}
                            value={teacher.cologne}
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'teacher.fields.city',
                            )}
                            value={teacher.city}
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

export default TeacherView;
