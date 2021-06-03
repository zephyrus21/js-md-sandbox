import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistMiddlware } from '../middleware/persist-middleware';
import reducers from '../reducers';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk, persistMiddlware)
);
