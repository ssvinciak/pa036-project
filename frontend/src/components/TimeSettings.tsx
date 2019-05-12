import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  defaultFromDate,
  defaultReloadTime,
  defaultToDate,
  defaultMinReloadTime,
  defaultMaxReloadTime,
} from '../constants/defaultTimeSettings';
import Slider from '@material-ui/lab/Slider/Slider';
import { DateFormatInput } from 'material-ui-next-pickers';
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

    this.setState(() => ({
      cacheType: value,
    }));
  };

  _setReloadTimeSlider = (_: React.ChangeEvent<HTMLInputElement>, value: number): void => {
    this.setState(() => ({
      reloadTime: value,
    }));
  };

  _save = (_: any): void => {
    this.props.saveSettings(this.state.fromDateTime, this.state.toDateTime, this.state.reloadTime, this.state.cacheType);
  };

  private renderSelectItems = (): React.ReactNode => {
    const options = cacheOptions.map((c) => (
      <MenuItem
        value={c.value}
        key={c.value}
      >
        {c.label}
      </MenuItem>
    ));

    const placeholder = (
      <MenuItem
        value=""
        key={0}
      >
        Enter value
      </MenuItem>
    );

    options.unshift(placeholder);
    return options;
  }

  render(): React.ReactNode {
    const selectStyles = {
      selectMenu: 'input-data',
    };

    return (
      <div className="card col-sm-3 col-md-3 col-lg-3 align-self-start shadow date-time-settings">
        <div className="card-body">
          <h5 className="card-title">Date and Cache Settings</h5>
          <div>
            <div className="input-group mb-3">
              <label
                className={'input-label'}
              >
                Begin date
              </label>
              <DateFormatInput
                name="date-input"
                value={this.state.fromDateTime}
                onChange={this._updateFromDateTime}
                dateFormat="dd. MM .yyyy"
                max={new Date()}
              />
            </div>
            <div className="input-group mb-3">
              <div>
                <label
                  className={'input-label'}
                >
                  End date
                </label>
              </div>
              <DateFormatInput
                name="date-input"
                value={this.state.toDateTime}
                onChange={this._updateToDateTime}
                dateFormat="dd. MM .yyyy"
                min={this.state.fromDateTime}
                max={new Date()}
                className={'input-data'}
              />
            </div>
            <div className="input-group mb-3">
              <label
                className={'input-label'}
              >
                Cache Type
              </label>
              <Select
                value={this.state.cacheType}
                onChange={this._setCache}
                autoWidth={true}
                className={'input-data'}
                classes={selectStyles}
              >
                {this.renderSelectItems()}
              </Select>
            </div>
            <div className="input-group input-group-centered mb-3">
              <label
                className={'input-label'}
              >
                Reload Time ({this.state.reloadTime} sec)
              </label>
              <Slider
                min={defaultMinReloadTime}
                max={defaultMaxReloadTime}
                value={this.state.reloadTime}
                step={1}
                onChange={this._setReloadTimeSlider}
                className={'input-data'}
              />
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
