import { combineReducers } from 'redux';
import cellReducer from './cellReducer';

const reducers = combineReducers({
  cell: cellReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
