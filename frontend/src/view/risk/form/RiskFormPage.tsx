import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/risk/form/riskFormActions';
import selectors from 'src/modules/risk/form/riskFormSelectors';
import { getHistory } from 'src/modules/store';
import RiskForm from 'src/view/risk/form/RiskForm';
import Spinner from 'src/view/shared/Spinner';
import { Grid } from '@mui/material';

function RiskFormPage(props) {
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
    ? i18n('entities.risk.edit.title')
    : i18n('entities.risk.new.title');

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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        {initLoading && <Spinner />}

        {dispatched && !initLoading && (
          <RiskForm
            saveLoading={saveLoading}
            initLoading={initLoading}
            record={record}
            isEditing={isEditing}
            hiddenImpossibleFields={!isEditing}
            onSubmit={doSubmit}
            onCancel={() =>
              isEditing
                ? getHistory().push(
                    `/risk/${match.params.id}`,
                  )
                : getHistory().push('/risk')
            }
          />
        )}
      </Grid>
    </Grid>
  );
}

export default RiskFormPage;
