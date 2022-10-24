import { Card } from '@mui/material';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import actions from 'src/modules/tenant/form/tenantFormActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/tenant/form/tenantFormSelectors';
import Spinner from 'src/view/shared/Spinner';
import TenantForm from 'src/view/tenant/form/TenantForm';

function TenantFormPage() {
  const dispatch = useDispatch();
  const [dispatched, setDispatched] = useState(false);
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.params.id);

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

  const title = isEditing
    ? i18n('tenant.edit.title')
    : i18n('tenant.new.title');

  return (
    <>
      <Card>
        <MDBox p={2.4}>
          <MDBox
            pb={2.4}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {title}
            </MDTypography>
          </MDBox>
          {initLoading && <Spinner />}

          {dispatched && !initLoading && (
            <TenantForm
              saveLoading={saveLoading}
              initLoading={initLoading}
              record={record}
              isEditing={isEditing}
              onSubmit={doSubmit}
              onCancel={() => getHistory().push('/tenant')}
            />
          )}
        </MDBox>
      </Card>
    </>
  );
}

export default TenantFormPage;
