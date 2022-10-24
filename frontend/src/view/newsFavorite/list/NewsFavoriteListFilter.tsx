import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'src/modules/newsFavorite/list/newsFavoriteListActions';

const NewsFavoriteListFilter = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.doFetch());
  }, []);

  return null;
};

export default NewsFavoriteListFilter;
