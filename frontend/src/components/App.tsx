import * as React from 'react';
import {
  defaultFromDate,
  defaultReloadTime,
  defaultToDate,
} from '../constants/defaultTimeSettings';
import '../sticky-footer.css';
import { TimeSettings } from './TimeSettings';
import { ResultGraphWrapper } from './ResultGraph';
import { AppSettings } from '../models/AppSettings';

type AppState = {
  settings: AppSettings,
  wasSubmitted: boolean,
};

export class App extends React.PureComponent<{}, AppState> {
  static displayName = 'App';

  state = {
    settings: {
      fromDate: defaultFromDate,
      toDate: defaultToDate,
      reloadTime: defaultReloadTime,
      // redisCacheOn: defaultRedisCache,
      // efCacheOn: defaultEFCache,
      cacheType: 1,
    },
    wasSubmitted: false,
  };

  _setSettings = (fromDate: Date, toDate: Date, reloadTime: number, cacheType: number) => {
    this.setState((prevState) => ({
      ...prevState,
      settings: {
        fromDate,
        toDate,
        reloadTime,
        cacheType,
      },
      wasSubmitted: true,
    }));
  };

  // _getCacheVersion = (): number => {
  //   if (this.state.settings.efCacheOn) {
  //     return this.state.settings.redisCacheOn ? redisOn_efOn : redisOff_efOn;
  //   }
  //   return this.state.settings.redisCacheOn ? redisOn_efOff : redisOff_efOff;
  // };

  render(): React.ReactNode {
    return (
      <div>
        <div className="navbar shadow-sm navbar-header align-items-center">
          <h1 >PA036 Project</h1>
        </div>
        <div
          className="container-fluid row"
          id={'under-header'}
        >
          <TimeSettings saveSettings={this._setSettings} />
          <ResultGraphWrapper
            reloadTime={this.state.settings.reloadTime}
            fromDate={this.state.settings.fromDate}
            toDate={this.state.settings.toDate}
            cacheType={this.state.settings.cacheType}
            wasSubmitted={this.state.wasSubmitted}
          />
        </div>
        <footer className="footer">
          <p>
            &copy; Team 11, PA036
          </p>
        </footer>
      </div>
    );
  }
}
