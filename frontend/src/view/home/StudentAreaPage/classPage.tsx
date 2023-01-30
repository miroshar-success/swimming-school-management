import { i18n } from 'src/i18n';
import { useEffect } from 'react';
import StudentAreaLayout from 'src/view/home/layout/studentAreaLayout';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import Header from 'src/view/home/layout/Header';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';
import { Card, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import lessonEnumerators from 'src/modules/lesson/lessonEnumerators';
import moment from 'moment';

export default function Dashboard(props) {
  const student = useSelector(
    authSelectors.selectCurrentUser,
  );
  return (
    <>
      <Header />
      <StudentAreaLayout>
        <Card>
          <MDBox pt={2.4} px={2.4}>
            <MDBox pb={2.4}>
              <MDBox
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              >
                <MDTypography variant="h3">
                  {i18n('student.class.title')}
                </MDTypography>
              </MDBox>
              <MDBox>
                <MDBox
                  pt={4}
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
                  {student.lessons.map((lesson, index) => (
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
                  ))}
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </StudentAreaLayout>
    </>
  );
}
