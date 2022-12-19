import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/attendance/view/attendanceViewActions';
import selectors from 'src/modules/attendance/view/attendanceViewSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import {
  Card,
  Checkbox,
  Grid,
  Avatar,
  Badge,
} from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Spinner from 'src/view/shared/Spinner';

function AttendancePage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(selectors.selectLoading);
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const loading = initLoading || saveLoading;
  const students = useSelector(selectors.selectStudents);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  console.log(students);

  return (
    <>
      <Card>
        <MDBox py={2.4} px={2.4}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3" mb={2.4}>
              {i18n('attendance.view.title')}
            </MDTypography>
          </MDBox>
          <MDBox>
            <MDTypography>
              {i18n('attendance.view.note')}
            </MDTypography>
            <MDBox mt={2}>
              {loading && <Spinner />}
              {!loading && students.length === 0 && (
                <MDBox textAlign="center" py={2}>
                  <MDTypography>
                    {i18n('table.noData')}
                  </MDTypography>
                </MDBox>
              )}
              {!loading && (
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  {students.map((student, index) => (
                    <Grid item key={index}>
                      <Checkbox
                        checked={student.checked}
                        onChange={(event) => {
                          if (event.target.checked) {
                            dispatch(
                              actions.doCreate(
                                student.id,
                                match.params.id,
                              ),
                            );
                            dispatch(
                              actions.doFind(
                                match.params.id,
                              ),
                            );
                          }
                        }}
                        icon={
                          <MDBox
                            textAlign="center"
                            sx={{
                              boxShadow: 3,
                              borderRadius: 3,
                            }}
                          >
                            <Badge
                              overlap="circular"
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              badgeContent={
                                <img src="/images/unchecked.svg" />
                              }
                            >
                              <Avatar
                                src={
                                  student.avatars &&
                                  student.avatars.length
                                    ? student.avatars[0]
                                        .downloadUrl
                                    : undefined
                                }
                                alt={student.email}
                                sx={{
                                  width: 180,
                                  height: 180,
                                }}
                                variant="square"
                              />
                            </Badge>
                            <MDTypography>
                              {student.studentNumber}
                            </MDTypography>
                            <MDTypography>
                              {student.fullName}
                            </MDTypography>
                          </MDBox>
                        }
                        checkedIcon={
                          <MDBox
                            textAlign="center"
                            sx={{
                              boxShadow: 3,
                              borderRadius: 3,
                            }}
                          >
                            <Badge
                              overlap="circular"
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              badgeContent={
                                <img src="/images/checked.svg" />
                              }
                            >
                              <Avatar
                                src={
                                  student.avatars &&
                                  student.avatars.length
                                    ? student.avatars[0]
                                        .downloadUrl
                                    : undefined
                                }
                                alt={student.email}
                                sx={{
                                  width: 180,
                                  height: 180,
                                }}
                                variant="square"
                              />
                            </Badge>
                            <MDTypography>
                              {student.studentNumber}
                            </MDTypography>
                            <MDTypography>
                              {student.fullName}
                            </MDTypography>
                          </MDBox>
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </>
  );
}

export default AttendancePage;
