import {
  Grid,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBox from 'src/mui/components/MDBox';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import MDTypography from 'src/mui/components/MDTypography';
import lessonEnumerators from 'src/modules/lesson/lessonEnumerators';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function TeacherView(props) {
  const { teacher, lessons, loading } = props;
  const { sidenavColor } = selectMuiSettings();

  if (loading || !teacher) {
    return <Spinner />;
  }

  return (
    <Grid container spacing={1.6} mb={4.8}>
      <Grid item md={4} xs={12}>
        <Card>
          <MDBox p={2.4}>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="center"
                  p={3}
                >
                  <LogoViewItem
                    value={teacher.avatars}
                    hiddenLabel
                  />
                </MDBox>
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
                <MDBox p={2.4}>
                  <MDTypography variant="h4">
                    {i18n('teacher.subTitle.generalInfo')}
                  </MDTypography>
                </MDBox>
                <Grid container spacing={1.6}>
                  <Grid item md={4} xs={12}>
                    <TextViewItem
                      label={i18n('teacher.fields.name')}
                      value={teacher.fullName}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextViewItem
                      label={i18n('teacher.fields.email')}
                      value={teacher.email}
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
                      label={i18n('teacher.fields.RFC')}
                      value={teacher.RFC}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
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
          <Grid item md={12}>
            <Card>
              <MDBox p={2.4}>
                <MDBox p={2.4}>
                  <MDTypography variant="h4">
                    {i18n('teacher.subTitle.schedules')}
                  </MDTypography>
                </MDBox>
                {lessons.map((lesson, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <MDTypography>
                        {lesson.class}
                      </MDTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {lesson.lessons.map((l, i) => (
                        <Grid
                          container
                          spacing={1.6}
                          key={i}
                        >
                          <Grid item md={2} xs={12}>
                            <CheckCircleIcon
                              fontSize="large"
                              color="success"
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <MDTypography>
                              {lessonEnumerators.day[l.day]}
                            </MDTypography>
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MDTypography>
                              {moment(l.time).format('LT') +
                                ' ~ ' +
                                moment(l.time)
                                  .add(
                                    l.class.duration,
                                    'minutes',
                                  )
                                  .format('LT')}
                            </MDTypography>
                          </Grid>
                        </Grid>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TeacherView;
