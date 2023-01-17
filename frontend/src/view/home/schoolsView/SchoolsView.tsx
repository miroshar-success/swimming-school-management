import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Avatar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { i18n } from 'src/i18n';

import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import lessonEnumerators from 'src/modules/lesson/lessonEnumerators';

import Spinner from 'src/view/shared/Spinner';
import MDTypography from 'src/mui/components/MDTypography';
import MDButton from 'src/mui/components/MDButton';
import MDBox from 'src/mui/components/MDBox';
import { grey } from '@mui/material/colors';

function SchoolsView(props) {
  const { sidenavColor } = selectMuiSettings();
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={0} container>
        <Grid item xs={12}>
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
              <Grid container spacing={2.4}>
                <Grid item md={6} xs={12}>
                  <Avatar
                    src={record.logos[0]?.downloadUrl}
                    alt="Logo"
                    sx={{
                      width: '100%',
                    }}
                    variant="rounded"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <MDTypography
                    variant="h2"
                    fontWeight="medium"
                  >
                    {record.name}
                  </MDTypography>
                  <MDTypography
                    variant="h5"
                    fontWeight="regular"
                  >
                    {`${record.direction}, ${record.cologne}`}
                  </MDTypography>
                  <MDTypography
                    variant="h5"
                    fontWeight="regular"
                  >
                    {`${record.condition} ${record.town}, ${record.zipCode}`}
                  </MDTypography>
                  <MDTypography
                    variant="h5"
                    fontWeight="regular"
                  >
                    {`Tel: ${record.phoneNumber}`}
                  </MDTypography>
                  <MDTypography
                    variant="h5"
                    fontWeight="regular"
                  >
                    {`Movil: ${record.cellPhoneNumber}`}
                  </MDTypography>
                  <MDBox
                    display="flex"
                    justifyContent="center"
                  >
                    <MDButton
                      components={Link}
                      to="/schools/:id/register"
                      size="large"
                      variant="gradient"
                      color={sidenavColor}
                      disabled={props.loading}
                      sx={{
                        px: 4,
                        py: 1.5,
                      }}
                    >
                      <MDTypography
                        variant="h5"
                        fontWeight="medium"
                      >
                        {i18n('common.register')}
                      </MDTypography>
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <MDBox
            display="flex"
            justifyContent="center"
            py={8}
            bgColor="white"
          >
            <MDBox width="80%">
              <Grid container spacing={1.6}>
                {record.photographs?.map((photo) => (
                  <Grid item md={3} xs={12} key={photo.id}>
                    <Avatar
                      src={photo.downloadUrl}
                      alt="Photograph"
                      sx={{
                        width: '100%',
                        height: 200,
                      }}
                      variant="square"
                    />
                  </Grid>
                ))}
              </Grid>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <MDBox
            display="flex"
            justifyContent="center"
            py={8}
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
              <Grid container spacing={2.4}>
                <Grid item md={9} xs={12}>
                  <MDTypography
                    variant="h5"
                    fontWeight="medium"
                  >
                    {i18n('schools.subtitle.description')}
                  </MDTypography>
                  <MDTypography
                    variant="h4"
                    fontWeight="medium"
                    sx={{
                      color: grey,
                    }}
                  >
                    {record.description}
                  </MDTypography>
                </Grid>
                <Grid item md={3} xs={12}>
                  <MDTypography
                    variant="h5"
                    fontWeight="medium"
                    sx={{
                      borderBottom: 1,
                      borderColor: 'grey.300',
                    }}
                  >
                    {i18n('schools.subtitle.openingHours')}
                  </MDTypography>
                  {record.openingHours?.map(
                    (day, index) => (
                      <MDBox
                        key={index}
                        display="flex"
                        pb={1}
                      >
                        <MDTypography
                          variant="h6"
                          textTransform="uppercase"
                          fontWeight="light"
                          sx={{ pr: 1 }}
                        >
                          {lessonEnumerators.day[index]}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          fontWeight="regular"
                          sx={{ pr: 1 }}
                        >
                          {day.start}
                        </MDTypography>
                        <MDTypography
                          variant="h6"
                          fontWeight="regular"
                        >
                          {day.end}
                        </MDTypography>
                      </MDBox>
                    ),
                  )}
                </Grid>
                <Grid item xs={12}>
                  <MDTypography
                    variant="h5"
                    fontWeight="medium"
                  >
                    {i18n('schools.subtitle.service')}
                  </MDTypography>
                  <MDBox>
                    <Grid container spacing={1.6}>
                      <Grid item md={3} xs={12}>
                        <MDBox display="flex">
                          {record.cafe ? (
                            <CheckIcon
                              fontSize="small"
                              color="success"
                            />
                          ) : (
                            <CheckIcon
                              fontSize="small"
                              color="error"
                            />
                          )}
                          <MDTypography
                            variant="h5"
                            fontWeight="regular"
                          >
                            {i18n('schools.fields.cafe')}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    );
  };

  const { record, loading } = props;

  console.log(record);
  console.log(loading);

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default SchoolsView;
