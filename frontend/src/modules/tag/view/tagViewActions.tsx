import TagService from 'src/modules/tag/tagService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'TAG_VIEW';

const tagViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: tagViewActions.FIND_STARTED,
      });

      const record = await TagService.find(id);

      dispatch({
        type: tagViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: tagViewActions.FIND_ERROR,
      });

      getHistory().push('/tag');
    }
  },
};

export default tagViewActions;
