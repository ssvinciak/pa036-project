import * as React from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';
import { DataModel } from '../models/DbRecord';
import { getTemperatureUrl } from '../utils/ApiUrlUtils';
import { Graph } from './Graph';

const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };

const formatDate = (date: any) => {
  return new Date(date).toLocaleDateString('cs-CZ', dateOptions);
};

const convertToDataModel = (data: any): DataModel[] => {
  return data.map((d: any) => ({
    id: d.Id,
    dateTime: formatDate(d.measurementDate),
    value: d.temperature,
  }));
};

type ResultGraphWrapperProps = {
  reloadTime: number,
  fromDate: Date,
  toDate: Date,
  wasSubmitted: boolean,
  cacheType: number,
};

type ResultGraphWraperState = {
  values: DataModel[],
  reloadTime: number,
  fromDate: Date,
  toDate: Date,
  wasSubmitted: boolean,
  cacheType: number,
  intervalId?: NodeJS.Timeout,
};

let from = new Date();
let to = new Date();

export class ResultGraphWrapper extends React.PureComponent<ResultGraphWrapperProps, ResultGraphWraperState> {
  static displayName = 'ResultGraph';

  state = {
    values: [],
    reloadTime: this.props.reloadTime,
    fromDate: this.props.fromDate,
    toDate: this.props.toDate,
    wasSubmitted: this.props.wasSubmitted,
    cacheType: this.props.cacheType,
  };

  componentDidMount(): void {
    console.log(this.state);
    console.log('graph did mount');

    from = this.state.fromDate;
    to = this.state.toDate;
    console.log(from + "" + to);

    const intervalId = setInterval(async () => {
      if (this.props.wasSubmitted) {
        const url = getTemperatureUrl(this.props.cacheType, this.state.fromDate, this.state.toDate);

        const data = await fetch(url);
        const json = await data.json();
        this.setState((prevState) => ({
          values: convertToDataModel(json),
          fromDate: prevState.fromDate.addDays(1),
          toDate: prevState.toDate.addDays(1),
        }));
      }
    }, this.props.reloadTime * 1000);

    this.setState(() => ({
      intervalId,
    }));
  }

  getDerivedStateFromProps(): void {

  }

  componentWillUnmount(): void {
    clearTimeout(this.state.reloadTime);
  }

  render(): React.ReactNode {
    if (!this.props.wasSubmitted) {
      return (
        <div className="card col-sm-8 col-md-8 col-lg-8 text-center shadow" id="center-card">
          <div className="card-body">
            <h5 className="card-title">Please setup time and cache settings to obtain data.</h5>
          </div>
        </div>
      );
    }
    return (
      <div className={'col-sm-8 col-md-9 col-lg-9'} >
        <Graph values={this.state.values} />
      </div>
    );
  }
}
