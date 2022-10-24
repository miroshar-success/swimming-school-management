import { createSelector } from 'reselect';

const selectRaw = (state) => state.newsArticle.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const newsArticleViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default newsArticleViewSelectors;
