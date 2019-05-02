import { AppAction } from './AppAction';

export const SET_TIME_SETTINGS = 'SET_TIME_SETTINGS';

export const setTimeSettings = (fromTime: string, toTime: string, reloadTime: number): AppAction => ({
  type: SET_TIME_SETTINGS,
  payload: {
    fromTime,
    toTime,
    reloadTime,
  },
});
