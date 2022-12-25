import listActions from 'src/modules/skill/list/skillListActions';
import SkillService from 'src/modules/skill/skillService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'SKILL_DESTROY';

const skillDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: skillDestroyActions.DESTROY_STARTED,
      });

      await SkillService.destroyAll([id]);

      dispatch({
        type: skillDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('skill.doDestroySuccess'));

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/skill');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: skillDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: skillDestroyActions.DESTROY_ALL_STARTED,
      });

      await SkillService.destroyAll(ids);

      dispatch({
        type: skillDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('skill.doDestroyAllSelectedSuccess'),
      );

      getHistory().push('/skill');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: skillDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default skillDestroyActions;
