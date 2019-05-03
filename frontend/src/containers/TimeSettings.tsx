import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TimeSettingsProps, TimeSettings } from '../components/TimeSettings';
import { setTimeSettings } from '../actions/setSettings';

type TimeSettingsOwnProps = {};

const mapDispatchToProps = (dispatch: Dispatch): TimeSettingsProps => ({
  saveSettings: (fromTime: Date, toTime: string, reloadTime: number) => dispatch(setTimeSettings(fromTime, toTime, reloadTime)),
});

const TimeSettingsContainer: React.ComponentClass<TimeSettingsOwnProps> =
  connect(null, mapDispatchToProps)(TimeSettings);
export { TimeSettingsContainer as TimeSettings };
