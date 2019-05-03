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
  fromTime: new Date(),
  toTime: new Date(),
  reloadTime: 2,
};

export const store = createStore(
  appStateReducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk, logger)),
);
