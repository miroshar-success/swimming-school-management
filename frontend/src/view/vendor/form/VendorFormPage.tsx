import { getHistory } from 'src/modules/store';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/vendor/form/vendorFormActions';
import EditVendorForm from 'src/view/vendor/form/EditVendorForm';
import MDTypography from 'src/mui/components/MDTypography';
import NewVendorForm from 'src/view/vendor/form/NewVendorForm';
import selectors from 'src/modules/vendor/form/vendorFormSelectors';
import Spinner from 'src/view/shared/Spinner';

function VendorFormPage(props) {
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
    ? i18n('entities.vendor.edit.title')
    : i18n('entities.vendor.new.title');

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
        {!isEditing && (
          <Grid item xs={12}>
            <MDTypography
              variant="h3"
              textAlign="center"
              mb={4}
            >
              {title}
            </MDTypography>
          </Grid>
        )}
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          {initLoading && <Spinner />}

          {dispatched &&
            !initLoading &&
            (isEditing ? (
              <EditVendorForm
                saveLoading={saveLoading}
                initLoading={initLoading}
                record={record}
                isEditing={isEditing}
                onSubmit={doSubmit}
                onCancel={() =>
                  getHistory().push(
                    `/vendor/${match.params.id}`,
                  )
                }
              />
            ) : (
              <NewVendorForm
                saveLoading={saveLoading}
                initLoading={initLoading}
                record={record}
                isEditing={isEditing}
                onSubmit={doSubmit}
                onCancel={() =>
                  getHistory().push('/vendor')
                }
              />
            ))}
        </Grid>
      </Grid>
    </>
  );
}

export default VendorFormPage;
