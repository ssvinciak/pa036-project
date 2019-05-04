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
import { defaultUrl } from '../constants/defaultUrlSettings';
import { TimeSettings } from './TimeSettings';
import { CacheSettings } from './CacheSettings';
import { ResultGraph } from './ResultGraph';

type AppState = {
  fromDate: Date,
  toDate: Date,
  reloadTime: number,
  cacheRedis_on: boolean,
  cacheEF_on: boolean,
  url: string,
};

export class App extends React.PureComponent<{}, AppState> {
  static displayName = 'App';

  state = {
    fromDate: defaultFromDate,
    toDate: defaultToDate,
    reloadTime: defaultReloadTime,
    cacheRedis_on: defaultRedisCache,
    cacheEF_on: defaultEFCache,
    url: defaultUrl,
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

  componentDidUpdate(): void {
    const url = `https://localhost:44398/api/data?cacheType=${this._getCacheVersion()}&from=${this.state.fromDate.toISOString()}&to=${this.state.toDate.toISOString()}`;
    console.log(url);
    this.setState(prevState => ({
      ...prevState,
      url,
    }));
  }

  render(): React.ReactNode {
    return (
      <div>
        <h1>PA036 Project</h1>
        <div className={'flex-column'}>
          <div className="card col-sm-4">
            <div className="card-body">
              <h5 className="card-title">Time Settings</h5>
              <TimeSettings saveSettings={this._setTimeSettings} />
            </div>
          </div>
          <div className="card col-sm-4">
            <div className="card-body">
              <h5 className="card-title">Cache Settings</h5>
              <CacheSettings saveSettings={this._setCacheSettings} />
            </div>
          </div>
          <ResultGraph
            reloadTime={this.state.reloadTime}
            url={this.state.url}
          />
          <footer className="footer">
            <p>
              &copy; Team 11, PA036
            </p>
          </footer>
        </div>
      </div>
    );
  }
}
