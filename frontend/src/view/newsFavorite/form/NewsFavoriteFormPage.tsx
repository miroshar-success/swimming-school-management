import { Card } from '@mui/material';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/newsFavorite/form/newsFavoriteFormActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NewsFavoriteForm from 'src/view/newsFavorite/form/NewsFavoriteForm';
import selectors from 'src/modules/newsFavorite/form/newsFavoriteFormSelectors';
import Spinner from 'src/view/shared/Spinner';

function NewsFavoriteFormPage(props) {
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
    ? i18n('entities.newsFavorite.edit.title')
    : i18n('entities.newsFavorite.new.title');

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
      <Card>
        <MDBox py={2.4} px={2.4}>
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
            <NewsFavoriteForm
              saveLoading={saveLoading}
              initLoading={initLoading}
              record={record}
              isEditing={isEditing}
              onSubmit={doSubmit}
              onCancel={() =>
                getHistory().push('/news-favorite')
              }
            />
          )}
        </MDBox>
      </Card>
    </>
  );
}

export default NewsFavoriteFormPage;
