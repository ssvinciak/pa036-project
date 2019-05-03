import * as React from 'react';
import { AppAction } from '../actions/AppAction';
import ReactDatePicker from 'react-datepicker';


type TimeSettingsState = {
  readonly fromDateTime: Date,
  readonly toDateTime: string,
  readonly reloadTime: number,
};

export type TimeSettingsProps = {
  readonly saveSettings: (fromTime: Date, toTime: string, reloadTime: number) => AppAction;
};

export class TimeSettings extends React.PureComponent<TimeSettingsProps, TimeSettingsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      fromDateTime: new Date(),
      toDateTime: 'new Date()',
      reloadTime: 10,
    }
  }

  _updateFromDateTime = (date: Date): void => {
    this.setState(() => ({
      fromDateTime: date,
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
      <div>
        <div>
          <label>Begin time:</label>
          <ReactDatePicker
            onChange={this._updateFromDateTime}
            selected={this.state.fromDateTime}
            maxDate={new Date()}
          />
          <br />
          <label>Finish time:</label>
          <ReactDatePicker
            onChange={this._updateToDateTime}
            selected={new Date()}
            minDate={this.state.fromDateTime}
          />
        </div>

        <div>
          <label>Reload time: (sec)</label>
          <input
            type="number"
            id="reloadTime"
            placeholder="2"
            required
            onChange={this._updateReloadTime}
            min={2}
          />
        </div>
        <button
          onClick={this._saveSettings}
        >
          Submit
        </button>
      </div>
    );
  }
}
