import * as React from 'react';
import {
  defaultFromDate, defaultRedisCache,
  defaultReloadTime,
  defaultToDate,
} from '../constants/defaultTimeSettings';
import { TimeSettings } from './TimeSettings';
import { ResultGraph } from './ResultGraph';
import { CacheSettings } from './CacheSettings';
import {
  redisOff_efOff,
  redisOff_efOn,
  redisOn_efOff,
  redisOn_efOn
} from '../constants/cacheVersions';

type AppState = {
  fromDate: Date,
  toDate: Date,
  reloadTime: number,
  cacheRedis_on: boolean,
  cacheEF_on: boolean,
};

export class App extends React.PureComponent<{}, AppState> {
  static displayName = 'App';

  state = {
    fromDate: defaultFromDate,
    toDate: defaultToDate,
    reloadTime: defaultReloadTime,
    cacheRedis_on: defaultRedisCache,
    cacheEF_on: defaultRedisCache,
  };

  _setTimeSettings = (fromDate: Date, toDate: Date, reloadTime: number) => {
    this.setState(prevState => ({
      ...prevState,
      fromDate,
      toDate,
      reloadTime,
    }));
  };

  _setCacheSettings = (cacheRedis_on: boolean, cacheEF_on: boolean) => {
    this.setState(prevState => ({
      ...prevState,
      cacheEF_on,
      cacheRedis_on,
    }));
  };

  _getCacheVersion = (): number => {
    if (this.state.cacheEF_on) {
      return this.state.cacheRedis_on ? redisOn_efOn : redisOff_efOn;
    }
    return this.state.cacheRedis_on ? redisOn_efOff : redisOff_efOff;
  };


  render(): React.ReactNode {
    const version = this._getCacheVersion();
    return (
      <div>
        <div>
          <TimeSettings saveSettings={this._setTimeSettings} />
          <CacheSettings saveSettings={this._setCacheSettings} />
          <ResultGraph
            fromTime={this.state.fromDate}
            toTime={this.state.toDate}
            reloadTime={this.state.reloadTime}
            cacheVersion={version}
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
