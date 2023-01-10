import Errors from 'src/modules/shared/error/errors';
import CountMaleAndFemaleService from 'src/modules/widget/countMaleAndFemale/countMaleAndFemaleService';

const prefix = 'WIDGET_COUNT_MALE_AND_FEMALE';

const countMaleAndFemaleActions = {
  GET_STARTED: `${prefix}_GET_STARTED`,
  GET_SUCCESS: `${prefix}_GET_SUCCESS`,
  GET_ERROR: `${prefix}_GET_ERROR`,
  RESET: `${prefix}_RESET`,

  doReset: () => async (dispatch, getState) => {
    dispatch({
      type: countMaleAndFemaleActions.RESET,
    });
  },

  doGetCountMaleAndFemale:
    () => async (dispatch, getState) => {
      try {
        dispatch({
          type: countMaleAndFemaleActions.GET_STARTED,
        });

        const day =
          await CountMaleAndFemaleService.getCountMaleAndFemale();

        dispatch({
          type: countMaleAndFemaleActions.GET_SUCCESS,
          payload: day,
        });
      } catch (error) {
        Errors.handle(error);
        dispatch({
          type: countMaleAndFemaleActions.GET_ERROR,
        });
      }
    },
};

export default countMaleAndFemaleActions;
