import { Dispatch } from 'redux';

import { ActionType } from '../action-types';
import { Action } from '../actions';
import bundle from '../../bundler';

export const createBundle = (id: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId: id,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId: id,
        bundle: result,
      },
    });
  };
};
