import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'src/modules/pool/list/poolListActions';

const PoolListFilter = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.doFetch());
  }, []);

  return null;
};

export default PoolListFilter;
