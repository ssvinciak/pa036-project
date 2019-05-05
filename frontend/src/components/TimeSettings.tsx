import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  defaultFromDate,
  defaultReloadTime,
  defaultToDate,
} from '../constants/defaultTimeSettings';
import ReactDatePicker from 'react-datepicker';
import 'react-dropdown/style.css';
import { cacheOptions } from '../constants/cacheVersions';
import Select from 'react-select';
import { Option } from 'react-select/lib/filters';

type TimeSettingsState = {
  fromDateTime: Date,
  toDateTime: Date,
  reloadTime: number,
  cacheType: number,
};

type TimeSettingsProps = {
  saveSettings: (fromDate: Date, toDate: Date, reloadTime: number, cacheType: number) => void,
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
    cacheType: 1,
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

  _setCache = (option: Option): void => {
    const parsedValue = parseInt(option.value, 10);
    this.setState(prevState => ({
      ...prevState,
      cacheType: parsedValue,
    }));
  };

  _save = (_: any): void => {
    this.props.saveSettings(this.state.fromDateTime, this.state.toDateTime, this.state.reloadTime, this.state.cacheType);
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
                <label
                  className={'input-name'}
                >
                  Reload Time (sec)
                </label>
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
            <div className="input-group mb-3">
              <div className="input-group-column input-group-prepend cache-settings">
                <div>
                  <label className={'input-name'}>Cache Type</label>
                </div>
                <Select options={cacheOptions} onChange={this._setCache} />
              </div>
            </div>
            <div className="submit-settings">
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
      </div >
    );
  }
}
