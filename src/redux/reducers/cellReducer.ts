import produce from 'immer';

import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../constants';

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

const cellReducer = produce(
  (state: CellState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL: {
        const { id, content } = action.payload;

        state.data[id].content = content;
        return state;
      }

      case ActionType.DELETE_CELL: {
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);

        return state;
      }

      case ActionType.MOVE_CELL: {
        const { id, direction } = action.payload;
        const index = state.order.findIndex((x) => x === id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex > state.order.length || targetIndex < 0) return state;

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;
      }

      case ActionType.INSERT_CELL_BEFORE: {
        const cell: Cell = {
          id: randomId(),
          type: action.payload.type,
          content: '',
        };

        state.data[cell.id] = cell;

        const index = state.order.findIndex((x) => x === action.payload.id);

        if (index < 0) state.order.push(cell.id);
        else state.order.splice(index, 0, cell.id);

        return state;
      }

      default:
        return state;
    }
  }
);

const randomId = () => Math.random().toString(36).substr(2, 5);

export default cellReducer;
