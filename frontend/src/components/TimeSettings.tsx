import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import {
  defaultEFCache,
  defaultFromDate, defaultRedisCache,
  defaultReloadTime,
  defaultToDate,
} from '../constants/defaultTimeSettings';

type TimeSettingsState = {
  fromDateTime: Date,
  toDateTime: Date,
  reloadTime: number,
  redisCache_On: boolean,
  efCache_On: boolean,
};

type TimeSettingsProps = {
  saveSettings: (fromDate: Date, toDate: Date, reloadTime: number, redis_on: boolean, ef_on: boolean/*, wasSubmitted: boolean*/) => void,
};

export class TimeSettings extends React.PureComponent<TimeSettingsProps, TimeSettingsState> {
  static displayName = 'TimeSettings';
  static propTypes = {
    saveSettings: PropTypes.func.isRequired,
  };

  state = {
    fromDateTime: defaultFromDate,
    toDateTime: defaultToDate,
    reloadTime: defaultReloadTime,
    redisCache_On: defaultRedisCache,
    efCache_On: defaultEFCache,
  };

  _updateFromDateTime = (date: Date): void => {
    this.setState(prevState => ({
      ...prevState,
      fromDateTime: date,
    }));
  };

  _updateToDateTime = (date: Date): void => {
    this.setState(prevState => ({
      ...prevState,
      toDateTime: date,
    }));
  };

  _updateReloadTime = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const reload = event.target.value;
    const parsedValue = parseInt(reload, 10);
    this.setState(prevState => ({
      ...prevState,
      reloadTime: parsedValue,
    }));
  };

  _switchEfCache = () => {
    this.setState(prevState => ({
      ...prevState,
      efCache_On: !prevState.efCache_On,
    }));
  };

  _switchRedisCache = () => {
    this.setState(prevState => ({
      ...prevState,
      redisCache_On: !prevState.redisCache_On,
    }));
  };

  _save = (_: any): void => {
    this.props.saveSettings(this.state.fromDateTime, this.state.toDateTime, this.state.reloadTime, this.state.efCache_On, this.state.redisCache_On);
  };

  render(): React.ReactNode {
    return (
      <div>
        <div>
          <div className="input-group mb-3">
            <div>
              <label
                // className="input-group-text label-md"
                id={'input-name'}
              // id="inputGroup-sizing-default"
              >
                Begin date
              </label>
            </div>
            <ReactDatePicker
              onChange={this._updateFromDateTime}
              selected={this.state.fromDateTime}
              maxDate={new Date()}
              className="form-control"
              id={'input-data'}
              dateFormat="dd.MM.yyyy"
            />
          </div>
          <div className="input-group mb-3">
            <div >{/*className="input-group-prepend"*/}
              <label
                // className="input-group-text"
                id={'input-name'}
              >
                End date
              </label>
            </div>
            <ReactDatePicker
              onChange={this._updateToDateTime}
              selected={this.state.toDateTime}
              minDate={this.state.fromDateTime}
              maxDate={new Date()}
              className="form-control"
              id={'input-data'}
              dateFormat="dd.MM.yyyy"
            />
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span
              //className="input-group-text"
              id={'input-name'}
            >
              Reload Time (sec)
            </span>
          </div>
          <div id={'input-data'}>
            <input
              type="number"
              id={'input-data'}
              placeholder={defaultReloadTime.toString()}
              required={true}
              onChange={this._updateReloadTime}
              min={2}
              className="form-control"
            />
          </div>
        </div>
        <div>
          <input
            form={'cacheSettings'}
            className={'custom-control-input'}
            id={'ef-cache'}
            type="checkbox"
            defaultChecked={defaultEFCache}
            onChange={this._switchEfCache}
          />
          <label
            className={'custom-control-label'}
            htmlFor={'ef-cache'}
          >
            Turn EF Cache ON
          </label>

        </div>
        <div>
          <input
            form={'cacheSettings'}
            className={'custom-control-input'}
            type="checkbox"
            id={'redis-cache'}
            defaultChecked={defaultRedisCache}
            onChange={this._switchRedisCache}
          />
          <label
            className={'custom-control-label'}
            htmlFor={'redis-cache'}
          >
            Turn Redis Cache ON
          </label>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          id={'submit-settings'}
          onClick={this._save}
        >
          Submit
        </button>
      </div>
    );
  }
}
