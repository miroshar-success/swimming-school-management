import listActions from 'src/modules/tag/list/tagListActions';
import TagService from 'src/modules/tag/tagService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'TAG_DESTROY';

const tagDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: tagDestroyActions.DESTROY_STARTED,
      });

      await TagService.destroyAll([id]);

      dispatch({
        type: tagDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('entities.tag.destroy.success'));

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/tag');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: tagDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: tagDestroyActions.DESTROY_ALL_STARTED,
      });

      await TagService.destroyAll(ids);

      dispatch({
        type: tagDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.tag.destroyAll.success'),
      );

      getHistory().push('/tag');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: tagDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default tagDestroyActions;
