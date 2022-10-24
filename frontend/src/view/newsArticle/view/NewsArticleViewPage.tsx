import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/newsArticle/view/newsArticleViewActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NewsArticleView from 'src/view/newsArticle/view/NewsArticleView';
import NewsArticleViewToolbar from 'src/view/newsArticle/view/NewsArticleViewToolbar';
import selectors from 'src/modules/newsArticle/view/newsArticleViewSelectors';
import Spinner from 'src/view/shared/Spinner';

function NewsArticlePage() {
  const dispatch = useDispatch();
  const [dispatched, setDispatched] = useState(false);
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  return (
    <>
      <Grid spacing={1.6} container>
        <Grid xs={12} item>
          <Card>
            <MDBox p={2.4}>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <MDTypography variant="h4">
                  {i18n('entities.newsArticle.view.title')}
                </MDTypography>
                <NewsArticleViewToolbar match={match} />
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
        <Grid xs={12} item>
          {loading && <Spinner />}
          {dispatched && !loading && (
            <NewsArticleView record={record} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default NewsArticlePage;
