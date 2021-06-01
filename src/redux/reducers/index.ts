import { combineReducers } from 'redux';
import { BundleReducer } from './bundleReducer';
import cellReducer from './cellReducer';

const reducers = combineReducers({
  cell: cellReducer,
  bundle: BundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
