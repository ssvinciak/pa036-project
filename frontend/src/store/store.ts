import {
  createStore,
  applyMiddleware,
} from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducers } from '../reducers/applicationReducers';


export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk, logger)),
);
