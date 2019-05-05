import * as React from 'react';
import {
  defaultEFCache,
  defaultFromDate,
  defaultRedisCache,
  defaultReloadTime,
  defaultToDate,
} from '../constants/defaultTimeSettings';
import {
  redisOff_efOff,
  redisOff_efOn,
  redisOn_efOff,
  redisOn_efOn,
} from '../constants/cacheVersions';
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
      redisCacheOn: defaultRedisCache,
      efCacheOn: defaultEFCache,
    },
    wasSubmitted: false,
  };

  _setSettings = (fromDate: Date, toDate: Date, reloadTime: number, efCacheOn: boolean, redisCacheOn: boolean /*,wasSubmitted: boolean*/) => {
    this.setState((prevState) => ({
      ...prevState,
      settings: {
        fromDate,
        toDate,
        reloadTime,
        efCacheOn,
        redisCacheOn,
      },
      wasSubmitted: true,
    }));
  };

  _getCacheVersion = (): number => {
    if (this.state.settings.efCacheOn) {
      return this.state.settings.redisCacheOn ? redisOn_efOn : redisOff_efOn;
    }
    return this.state.settings.redisCacheOn ? redisOn_efOff : redisOff_efOff;
  };

  render(): React.ReactNode {
    return (
      <div>
        <header className="header">
          <h1>PA036 Project</h1>
        </header>
        <div
          className={'row'}
          id={'under-header'}
        >
          <div className="card col-sm-4 col-md-3 col-lg-3 shadow">
            <div className="card-body">
              <h5 className="card-title">Date and Cache Settings</h5>
              <TimeSettings saveSettings={this._setSettings} />
            </div>
          </div>
          <div className="col-sm-8 col-md-9 col-lg-9" id={'right-side'}>
            <ResultGraphWrapper
              reloadTime={this.state.settings.reloadTime}
              fromDate={this.state.settings.fromDate}
              toDate={this.state.settings.toDate}
              cacheType={this._getCacheVersion()}
              wasSubmitted={this.state.wasSubmitted}
            />
          </div>

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
