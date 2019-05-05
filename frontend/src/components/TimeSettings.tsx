import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  defaultEFCache,
  defaultFromDate, defaultRedisCache,
  defaultReloadTime,
  defaultToDate,
} from '../constants/defaultTimeSettings';
import ReactDatePicker from 'react-datepicker';

type TimeSettingsState = {
  fromDateTime: Date,
  toDateTime: Date,
  reloadTime: number,
  redisCache_On: boolean,
  efCache_On: boolean,
};

type TimeSettingsProps = {
  saveSettings: (fromDate: Date, toDate: Date, reloadTime: number, redis_on: boolean, ef_on: boolean) => void,
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
      <div className="card col-sm-4 col-md-3 col-lg-3 shadow date-time-settings">
        <div className="card-body">
          <h5 className="card-title">Date and Cache Settings</h5>
      <div>
        <div>
          <div className="input-group mb-3">
            <div>
              <label
                className={'input-name'}
              >
                Begin date
              </label>
            </div>
            <ReactDatePicker
              onChange={this._updateFromDateTime}
              selected={this.state.fromDateTime}
              maxDate={new Date()}
              className="form-control input-date-picker"
              dateFormat="dd. MM .yyyy"
            />
          </div>
          <div className="input-group mb-3">
            <div>
              <label
                className={'input-name'}
              >
                End date
              </label>
            </div>
            <ReactDatePicker
              onChange={this._updateToDateTime}
              selected={this.state.toDateTime}
              minDate={this.state.fromDateTime}
              maxDate={new Date()}
              className="form-control input-date-picker"
              dateFormat="dd. MM. yyyy"
            />
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span
              className={'input-name'}
            >
              Reload Time (sec)
            </span>
          </div>
          <div className="input-group">
            <input
              type="number"
              placeholder={defaultReloadTime.toString()}
              required={true}
              onChange={this._updateReloadTime}
              min={2}
              className="form-control input-data"
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
        <div className='submit-settings'>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this._save}
        >
          Submit
        </button>
        </div>
      </div>
        </div>
      </div>
    );
  }
}
