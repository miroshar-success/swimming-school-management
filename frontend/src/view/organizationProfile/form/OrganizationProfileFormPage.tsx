import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/organizationProfile/form/organizationProfileFormActions';
import selectors from 'src/modules/organizationProfile/form/organizationProfileFormSelectors';
import { getHistory } from 'src/modules/store';
import OrganizationProfileForm from 'src/view/organizationProfile/form/OrganizationProfileForm';
import Spinner from 'src/view/shared/Spinner';
import { Card, Grid } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function OrganizationProfileFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.params.id);
  const title = isEditing
    ? i18n('entities.organizationProfile.edit.title')
    : i18n('entities.organizationProfile.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <MDTypography
            variant="h3"
            textAlign="center"
            mb={4}
          >
            {title}
          </MDTypography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          {initLoading && <Spinner />}

          {dispatched && !initLoading && (
            <OrganizationProfileForm
              saveLoading={saveLoading}
              initLoading={initLoading}
              record={record}
              isEditing={isEditing}
              onSubmit={doSubmit}
              onCancel={() =>
                getHistory().push('/organization-profile')
              }
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default OrganizationProfileFormPage;
