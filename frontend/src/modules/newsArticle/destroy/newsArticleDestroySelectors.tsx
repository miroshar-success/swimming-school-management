import { createSelector } from 'reselect';

const selectRaw = (state) => state.newsArticle.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const newsArticleDestroySelectors = {
  selectLoading,
};

export default newsArticleDestroySelectors;
