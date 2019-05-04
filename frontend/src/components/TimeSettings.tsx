import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import {
  defaultFromDate,
  defaultReloadTime,
  defaultToDate,
} from '../constants/defaultTimeSettings';

type TimeSettingsState = {
  fromDateTime: Date,
  toDateTime: Date,
  reloadTime: number,
};

type TimeSettingsProps = {
  saveSettings: (fromDate: Date, toDate: Date, reloadTime: number) => void,
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
    const datetime = event.target.value;
    const parsedValue = parseInt(datetime, 10);
    this.setState(prevState => ({
      ...prevState,
      reloadTime: parsedValue,
    }));
  };

  _save = (_: any): void => {
    this.props.saveSettings(this.state.fromDateTime, this.state.toDateTime, this.state.reloadTime);
  };

  render(): React.ReactNode {
    return (
      <div>
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text label-md"
                id="inputGroup-sizing-default"
              >
                Begin date
              </span>
            </div>
            <ReactDatePicker
              onChange={this._updateFromDateTime}
              selected={this.state.fromDateTime}
              maxDate={new Date()}
              className="form-control"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                id="inputGroup-sizing-default"
              >
                End date
              </span>
            </div>
            <ReactDatePicker
              onChange={this._updateToDateTime}
              selected={this.state.toDateTime}
              minDate={this.state.fromDateTime}
              maxDate={new Date()}
              className="form-control"
            />
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              id="inputGroup-sizing-default"
            >
              Reload Time (sec)
            </span>
          </div>
          <input
            type="number"
            id="reloadTime"
            placeholder={this.state.reloadTime.toString()}
            required={true}
            onChange={this._updateReloadTime}
            min={2}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this._save}
        >
          Submit
        </button>
      </div>
    );
  }
}
