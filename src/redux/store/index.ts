import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ActionType } from '../action-types';
import reducers from '../reducers';

export const store = createStore(reducers, {}, applyMiddleware(thunk));
