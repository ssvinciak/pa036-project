import {
  createStore,
  applyMiddleware,
} from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { AppState } from './AppState';
import { appStateReducer } from '../reducers/appStateReducer';

export const preloadedState: AppState = {
  fromTime: '2000-01-01 00:00',
  toTime: '2001-01-01 00:00',
  reloadTime: 5000,
};

export const store = createStore(
  appStateReducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk, logger)),
);
