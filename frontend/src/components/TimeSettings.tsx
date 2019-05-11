import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  defaultFromDate,
  defaultReloadTime,
  defaultToDate,
} from '../constants/defaultTimeSettings';
import ReactDatePicker from 'react-datepicker';
import 'react-dropdown/style.css';
import Slider from '@material-ui/lab/Slider/Slider';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { cacheOptions } from '../constants/cacheVersions';

type TimeSettingsState = {
  fromDateTime: Date,
  toDateTime: Date,
  reloadTime: number,
  cacheType: number,
  cacheOptionsVisible: boolean,
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
    cacheOptionsVisible: false,
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

  _setCache = (event: any): void => {
    const value = event.target.value;
    console.log(value);

    const cacheType = 3;
    this.setState(() => ({
      cacheType,
    }));
    this._setCacheOptionsNotVisible();
  };

  _setReloadTimeSlider = (_: React.ChangeEvent<HTMLInputElement>, value: number): void => {
    this.setState(() => ({
      reloadTime: value,
    }));
  };

  _save = (_: any): void => {
    this.props.saveSettings(this.state.fromDateTime, this.state.toDateTime, this.state.reloadTime, this.state.cacheType);
  };

  _setCacheOptionsVisible = () => {
    this.setState(() => ({
      cacheOptionsVisible: true,
    }));
  };

  _setCacheOptionsNotVisible = () => {
    this.setState(() => ({
      cacheOptionsVisible: false,
    }));
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
            <label
              className={'input-name'}
            >
              Cache Type
            </label>
            <Select
              value={this.state.cacheType}
              onChange={this._setCache}
            >
              {
                cacheOptions.map(c => {
                  return <MenuItem value={c.value} onSelect={this._setCache} key={c.value}>{c.label}</MenuItem>;
                })
              }
            </Select>
            <label
              className={'input-name'}
            >
              Reload Time ({this.state.reloadTime} sec)
            </label>
            <Slider
              min={2}
              max={20}
              value={this.state.reloadTime}
              step={1}
              onChange={this._setReloadTimeSlider}
            />
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
