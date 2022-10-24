import { getHistory } from 'src/modules/store';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/newsArticle/form/newsArticleFormActions';
import NewsArticleForm from 'src/view/newsArticle/form/NewsArticleForm';
import selectors from 'src/modules/newsArticle/form/newsArticleFormSelectors';
import Spinner from 'src/view/shared/Spinner';

function NewsArticleFormPage(props) {
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
    ? i18n('entities.newsArticle.edit.title')
    : i18n('entities.newsArticle.new.title');

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
          <NewsArticleForm
            saveLoading={saveLoading}
            initLoading={initLoading}
            record={record}
            isEditing={isEditing}
            hiddenImpossibleFields={!isEditing}
            onSubmit={doSubmit}
            onCancel={() =>
              getHistory().push('/news-article')
            }
          />
        )}
      </Grid>
    </Grid>
  );
}

export default NewsArticleFormPage;
