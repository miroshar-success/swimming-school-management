import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/newsFavorite/view/newsFavoriteViewActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NewsFavoriteView from 'src/view/newsFavorite/view/NewsFavoriteView';
import NewsFavoriteViewToolbar from 'src/view/newsFavorite/view/NewsFavoriteViewToolbar';
import selectors from 'src/modules/newsFavorite/view/newsFavoriteViewSelectors';

function NewsFavoritePage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

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
              {i18n('entities.newsFavorite.view.title')}
            </MDTypography>
            <NewsFavoriteViewToolbar match={match} />
          </MDBox>
          <NewsFavoriteView
            loading={loading}
            record={record}
          />
        </MDBox>
      </Card>
    </>
  );
}

export default NewsFavoritePage;
