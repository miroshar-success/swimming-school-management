import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';

import { getHistory } from 'src/modules/store';
import actions from 'src/modules/schools/register/schoolsRegisterActions';
import selectors from 'src/modules/schools/register/schoolsRegisterSelectors';
import schoolsSelectors from 'src/modules/schools/view/schoolsViewSelectors';
import schoolsActions from 'src/modules/schools/view/schoolsViewActions';

import MDBox from 'src/mui/components/MDBox';

import { Avatar, Card, Grid } from '@mui/material';

import SchoolsRegister from 'src/view/home/schoolsRegister/SchoolsRegister';
import Spinner from 'src/view/shared/Spinner';
import Footer from 'src/view/home/layout/Footer';
import Header from 'src/view/home/layout/Header';

import PageLayout from 'src/mui/shared/Layouts/PageLayout';
import MDTypography from 'src/mui/components/MDTypography';

function SchoolsRegisterPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const initLoading = useSelector(
    schoolsSelectors.selectLoading,
  );

  const school = useSelector(schoolsSelectors.selectRecord);

  useEffect(() => {
    dispatch(schoolsActions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  console.log(school);

  const doSubmit = (data) => {
    dispatch(
      actions.doAdd({
        ...data,
        tenantId: match.params.tenantId,
      }),
    );
  };

  return (
    <>
      <PageLayout>
        <Header />
        <MDBox
          display="flex"
          justifyContent="center"
          pt={15}
          pb={8}
          sx={({
            palette: {
              transparent: transparentColor,
              white,
            },
            functions: { rgba },
          }: any) => ({
            backgroundColor: rgba(white.main, 0.4),
          })}
        >
          <MDBox width="80%">
            <MDBox textAlign="center" pb={4}>
              <MDTypography variant="h1">
                {i18n('schools.register.title')}
              </MDTypography>
            </MDBox>
            <Grid container spacing={2.4}>
              <Grid item md={9} xs={12}>
                <SchoolsRegister
                  saveLoading={saveLoading}
                  onSubmit={doSubmit}
                  onCancel={() =>
                    getHistory().push(
                      `/schools/${match.params.id}`,
                    )
                  }
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <Card>
                  <MDBox
                    p={2.4}
                    display="flex"
                    justifyContent="center"
                  >
                    {initLoading && <Spinner />}
                    {!initLoading && school && (
                      <MDBox>
                        <MDBox
                          display="flex"
                          alignItems="center"
                        >
                          <Avatar
                            src={
                              school.logos[0]?.downloadUrl
                            }
                            variant="rounded"
                            sx={{
                              width: '50%',
                              height: 'auto',
                            }}
                          />
                          <MDTypography variant="h4">
                            {school.name}
                          </MDTypography>
                        </MDBox>
                        <MDTypography
                          sx={{ mt: 2 }}
                          variant="h6"
                          fontWeight="medium"
                        >
                          {`${school.direction}, ${school.cologne}`}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          fontWeight="medium"
                        >
                          {`${school.condition} ${school.town}, ${school.zipCode}`}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          fontWeight="medium"
                        >
                          {`${i18n(
                            'schools.fields.phone',
                          )}: ${school.phoneNumber}`}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          fontWeight="medium"
                        >
                          {`${i18n(
                            'schools.fields.mobile',
                          )}: ${school.cellPhoneNumber}`}
                        </MDTypography>
                      </MDBox>
                    )}
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <Footer />
      </PageLayout>
    </>
  );
}

export default SchoolsRegisterPage;
