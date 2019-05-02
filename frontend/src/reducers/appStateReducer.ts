import { AppState } from '../store/AppState';
import { AppAction } from '../actions/AppAction';
import { SET_TIME_SETTINGS } from '../actions/setSettings';
import { preloadedState } from '../store/store';

export const appStateReducer = (state = preloadedState, action: AppAction): AppState => {
  switch (action.type) {
    case SET_TIME_SETTINGS: {
      return {
        fromTime: action.payload.fromTime,
        toTime: action.payload.toTime,
        reloadTime: action.payload.reloadTime,
      };
    }
    default: {
      return state;
    }
  }
};
