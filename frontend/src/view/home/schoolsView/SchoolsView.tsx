import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Avatar, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MaterialLink from '@mui/material/Link';

import { i18n } from 'src/i18n';

import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import lessonEnumerators from 'src/modules/lesson/lessonEnumerators';

import Spinner from 'src/view/shared/Spinner';
import HtmlView from 'src/view/shared/HTMLView';

import MDTypography from 'src/mui/components/MDTypography';
import MDButton from 'src/mui/components/MDButton';
import MDBox from 'src/mui/components/MDBox';

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
            pb={6}
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
                  <MDBox margin={3.2} borderRadius="lg">
                    <Avatar
                      src={record.logos[0]?.downloadUrl}
                      alt="Logo"
                      sx={{
                        width: '100%',
                        height: 'auto',
                      }}
                      variant="rounded"
                    />
                  </MDBox>
                </Grid>
                <Grid item md={6} xs={12}>
                  <MDBox margin={3.2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <MDBox
                          px={3}
                          py={1.6}
                          borderRadius="md"
                          sx={({
                            palette: {
                              transparent: transparentColor,
                              warning,
                            },
                            functions: { rgba },
                          }: any) => ({
                            backgroundColor: rgba(
                              warning.main,
                              0.2,
                            ),
                          })}
                        >
                          <MDTypography
                            variant="h5"
                            fontWeight="regular"
                            color="warning"
                          >
                            {`${record.direction}, ${record.cologne}`}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12}>
                        <MDBox
                          px={3}
                          py={1.6}
                          borderRadius="md"
                          sx={({
                            palette: {
                              transparent: transparentColor,
                              primary,
                            },
                            functions: { rgba },
                          }: any) => ({
                            backgroundColor: rgba(
                              primary.main,
                              0.2,
                            ),
                          })}
                        >
                          <MDTypography
                            variant="h5"
                            fontWeight="regular"
                            color="primary"
                          >
                            {`${record.condition} ${record.town}, ${record.zipCode}`}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12}>
                        <MDBox
                          px={3}
                          py={1.6}
                          borderRadius="md"
                          sx={({
                            palette: {
                              transparent: transparentColor,
                              secondary,
                            },
                            functions: { rgba },
                          }: any) => ({
                            backgroundColor: rgba(
                              secondary.main,
                              0.2,
                            ),
                          })}
                        >
                          <MDTypography
                            variant="h5"
                            fontWeight="regular"
                            color="secondary"
                          >
                            {`Tel: ${record.phoneNumber}`}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12}>
                        <MDBox
                          px={3}
                          py={1.6}
                          borderRadius="md"
                          sx={({
                            palette: {
                              transparent: transparentColor,
                              success,
                            },
                            functions: { rgba },
                          }: any) => ({
                            backgroundColor: rgba(
                              success.main,
                              0.2,
                            ),
                          })}
                        >
                          <MDTypography
                            variant="h5"
                            fontWeight="regular"
                            color="success"
                          >
                            {`Movil: ${record.cellPhoneNumber}`}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12}>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          mt={1}
                        >
                          <MDButton
                            components={Link}
                            to="/schools/:id/register"
                            size="large"
                            variant="gradient"
                            color={sidenavColor}
                            disabled={props.loading}
                            sx={{
                              px: '30%',
                              py: 1.5,
                            }}
                          >
                            <MDTypography
                              variant="h5"
                              fontWeight="medium"
                              color="white"
                            >
                              {i18n('common.register')}
                            </MDTypography>
                          </MDButton>
                        </MDBox>
                      </Grid>
                    </Grid>
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
            py={10}
            bgColor="white"
          >
            <MDBox width="80%">
              <Grid container spacing={3.6}>
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
            pt={6}
            pb={10}
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
              <Grid container spacing={3.6}>
                <Grid item md={8} xs={12}>
                  <MDBox
                    p={2.5}
                    borderRadius="md"
                    sx={{
                      border: 1,
                      borderColor: 'grey.300',
                    }}
                  >
                    <MDTypography
                      variant="h4"
                      fontWeight="medium"
                      sx={{
                        pb: 2,
                      }}
                    >
                      {i18n('schools.subtitle.description')}
                    </MDTypography>
                    <HtmlView
                      value={`<h1>${record.description}</h1>`}
                    />
                  </MDBox>
                </Grid>
                <Grid item md={4} xs={12}>
                  <MDBox
                    borderRadius="lg"
                    p={2.5}
                    sx={{
                      border: 1,
                      borderColor: 'grey.300',
                    }}
                  >
                    <MDTypography
                      variant="h4"
                      fontWeight="medium"
                      sx={{ pb: 2 }}
                    >
                      {i18n(
                        'schools.subtitle.openingHours',
                      )}
                    </MDTypography>
                    <Grid container spacing={1.6}>
                      {record.openingHours?.map(
                        (day, index) => {
                          if (day.start) {
                            return (
                              <Grid
                                item
                                xs={12}
                                key={index}
                              >
                                <MDBox display="flex">
                                  <CheckIcon
                                    fontSize="medium"
                                    color="success"
                                  />
                                  <MDTypography
                                    variant="h5"
                                    textTransform="uppercase"
                                    fontWeight="light"
                                    sx={{ pr: 1 }}
                                  >
                                    {
                                      lessonEnumerators.day[
                                        index
                                      ]
                                    }
                                  </MDTypography>
                                  <MDTypography
                                    variant="h5"
                                    fontWeight="regular"
                                    sx={{ pr: 1 }}
                                  >
                                    {`${day.start} ~ ${day.end}`}
                                  </MDTypography>
                                </MDBox>
                              </Grid>
                            );
                          } else {
                            return <div key={index}></div>;
                          }
                        },
                      )}
                    </Grid>
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <MDBox
                    p={2.5}
                    borderRadius="lg"
                    sx={{
                      border: 1,
                      borderColor: 'grey.300',
                    }}
                  >
                    <MDTypography
                      variant="h4"
                      fontWeight="medium"
                      sx={{ pb: 2 }}
                    >
                      {i18n('schools.subtitle.service')}
                    </MDTypography>
                    <Grid container spacing={1.6}>
                      <Grid item md={3} xs={12}>
                        <MDBox display="flex">
                          {record.cafe ? (
                            <CheckIcon
                              fontSize="medium"
                              color="success"
                            />
                          ) : (
                            <CloseIcon
                              fontSize="medium"
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
                      <Grid item md={3} xs={12}>
                        <MDBox display="flex">
                          {record.parkingLot ? (
                            <CheckIcon
                              fontSize="medium"
                              color="success"
                            />
                          ) : (
                            <CloseIcon
                              fontSize="medium"
                              color="error"
                            />
                          )}
                          <MDTypography
                            variant="h5"
                            fontWeight="regular"
                          >
                            {i18n(
                              'schools.fields.parkingLot',
                            )}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <MDBox display="flex">
                          {record.balletParking ? (
                            <CheckIcon
                              fontSize="medium"
                              color="success"
                            />
                          ) : (
                            <CloseIcon
                              fontSize="medium"
                              color="error"
                            />
                          )}
                          <MDTypography
                            variant="h5"
                            fontWeight="regular"
                          >
                            {i18n(
                              'schools.fields.balletParking',
                            )}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <MDBox display="flex">
                          {record.waitingRoom ? (
                            <CheckIcon
                              fontSize="medium"
                              color="success"
                            />
                          ) : (
                            <CloseIcon
                              fontSize="medium"
                              color="error"
                            />
                          )}
                          <MDTypography
                            variant="h5"
                            fontWeight="regular"
                          >
                            {i18n(
                              'schools.fields.waitingRoom',
                            )}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <MDBox display="flex">
                          {record.gym ? (
                            <CheckIcon
                              fontSize="medium"
                              color="success"
                            />
                          ) : (
                            <CloseIcon
                              fontSize="medium"
                              color="error"
                            />
                          )}
                          <MDTypography
                            variant="h5"
                            fontWeight="regular"
                          >
                            {i18n('schools.fields.gym')}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <MDBox display="flex">
                          {record.bathroom ? (
                            <CheckIcon
                              fontSize="medium"
                              color="success"
                            />
                          ) : (
                            <CloseIcon
                              fontSize="medium"
                              color="error"
                            />
                          )}
                          <MDTypography
                            variant="h5"
                            fontWeight="regular"
                          >
                            {i18n(
                              'schools.fields.bathroom',
                            )}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <MDBox display="flex">
                          {record.wateringCan ? (
                            <CheckIcon
                              fontSize="medium"
                              color="success"
                            />
                          ) : (
                            <CloseIcon
                              fontSize="medium"
                              color="error"
                            />
                          )}
                          <MDTypography
                            variant="h5"
                            fontWeight="regular"
                          >
                            {i18n(
                              'schools.fields.wateringCan',
                            )}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <MDBox display="flex">
                          {record.dressingRoom ? (
                            <CheckIcon
                              fontSize="medium"
                              color="success"
                            />
                          ) : (
                            <CloseIcon
                              fontSize="medium"
                              color="error"
                            />
                          )}
                          <MDTypography
                            variant="h5"
                            fontWeight="regular"
                          >
                            {i18n(
                              'schools.fields.dressingRoom',
                            )}
                          </MDTypography>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <MDBox
                    p={2.5}
                    pr={3.5}
                    borderRadius="lg"
                    sx={{
                      border: 1,
                      borderColor: 'grey.300',
                    }}
                    display="flex"
                    justifyContent="end"
                  >
                    <MaterialLink href={record.facebook}>
                      <IconButton>
                        <FacebookIcon fontSize="medium" />
                      </IconButton>
                    </MaterialLink>
                    <MaterialLink href={record.twitter}>
                      <IconButton>
                        <TwitterIcon fontSize="medium" />
                      </IconButton>
                    </MaterialLink>
                    <MaterialLink href={record.instagram}>
                      <IconButton>
                        <InstagramIcon fontSize="medium" />
                      </IconButton>
                    </MaterialLink>
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
