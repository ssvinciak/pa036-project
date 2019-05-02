import * as React from 'react';
import { AppAction } from '../actions/AppAction';
import ReactDatePicker from 'react-datepicker';

type TimeSettingsState = {
  readonly fromDateTime: string,
  readonly toDateTime: string,
  readonly reloadTime: number,
};

export type TimeSettingsProps = {
  readonly saveSettings: (fromTime: string, toTime: string, reloadTime: number) => AppAction;
};

export class TimeSettings extends React.PureComponent<TimeSettingsProps, TimeSettingsState> {
  _updateFromDateTime = (date: Date): void => {
    const datetime = date.toDateString();
    this.setState(() => ({
      fromDateTime: datetime,
    }));
  };

  _updateToDateTime = (date: Date): void => {
    const datetime = date.toDateString();
    this.setState(() => ({
      toDateTime: datetime,
    }));
  };

  _updateReloadTime = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const datetime = event.target.value;
    const parsedValue = parseInt(datetime, 10);
    this.setState(() => ({
      reloadTime: parsedValue * 1000,
    }));
  };

  _saveSettings = (): any => {
    this.props.saveSettings(this.state.fromDateTime, this.state.toDateTime, this.state.reloadTime);
  };

  render(): React.ReactNode {
    return (
      <form>
        <div>
          <label>Begin time:</label>
          <div className='datepicker-control-section'>
            <ReactDatePicker
              onChange={this._updateFromDateTime}
              selected={new Date()}
            />
          </div>
          <br/>
          <label>Finish time:</label>
          <div className='datepicker-control-section'>
            <ReactDatePicker
              onChange={this._updateToDateTime}
              selected={new Date()}
            />
          </div>
        </div>

        <div>
          <label>Data from date and time: (sec)</label>
          <input
            type="number"
            id="reloadTime"
            placeholder="2"
            required
            onChange={this._updateReloadTime}
          />
        </div>
        <button
          onClick={this._saveSettings}
        >
          Submit
        </button>
      </form>
    );
  }
}
