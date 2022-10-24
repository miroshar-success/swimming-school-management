import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import NewsArticleViewItem from 'src/view/newsArticle/view/NewsArticleViewItem';
import Spinner from 'src/view/shared/Spinner';
import UserViewItem from 'src/view/user/view/UserViewItem';

function NewsFavoriteView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid xs={12} item>
          <UserViewItem
            label={i18n(
              'entities.newsFavorite.fields.user',
            )}
            value={record.user}
          />
        </Grid>
        <Grid xs={12} item>
          <NewsArticleViewItem
            label={i18n(
              'entities.newsFavorite.fields.newsArticle',
            )}
            value={record.newsArticle}
          />
        </Grid>
        <Grid xs={12} item>
          <CreationInfo {...props} />
        </Grid>
      </Grid>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default NewsFavoriteView;
