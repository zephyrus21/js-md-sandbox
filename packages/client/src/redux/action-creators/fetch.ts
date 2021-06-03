import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../constants';
import { RootState } from '../reducers';

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });
    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');

      dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
    } catch (err) {
      dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: err.message });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cell } = getState();

    let cells;
    if (cell) cells = cell.order.map((id) => cell.data[id]);

    try {
      await axios.post('/cells', { cells });
    } catch (err) {
      dispatch({ type: ActionType.BUNDLE_COMPLETE, payload: err.message });
    }
  };
};
