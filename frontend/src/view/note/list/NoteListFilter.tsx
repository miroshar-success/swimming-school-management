import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'src/modules/note/list/noteListActions';

const NoteListFilter = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.doFetch());
  }, []);

  return null;
};

export default NoteListFilter;
