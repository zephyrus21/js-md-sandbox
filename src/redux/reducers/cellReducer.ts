import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell, CellTypes } from '../constants/cell';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellReducer = (
  state: CellState = initialState,
  action: Action
): CellState => {
  switch (action.type) {
    case ActionType.MOVE_CELL:
      return state;

    case ActionType.DELETE_CELL:
      return state;

    case ActionType.INSERT_CELL_BEFORE:
      return state;

    case ActionType.UPDATE_CELL:
      return state;

    default:
      return state;
  }
};

export default cellReducer;
