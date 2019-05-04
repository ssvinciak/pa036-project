import * as React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { DataModel } from '../models/DbRecord';

<<<<<<< HEAD
export type ResultGraphOwnProps = {
  fromTime: Date,
  toTime: Date,
  reloadTime: number,
};

type ResultGraphState = {
  values: DataModel[];
};

const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
=======
const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
>>>>>>> master

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

type ResultGraphProps = {
  fromTime: Date,
  toTime: Date,
  reloadTime: number,
  cacheVersion: number,
};

type ResultGraphState = {
  values: DataModel[];
};

export class ResultGraph extends React.PureComponent<ResultGraphProps, ResultGraphState> {
  static displayName = 'ResultGraph';

  state = {
    values: [],
  };

  componentDidMount(): void {
     const url = 'https://localhost:44398/api/data?cacheType='
       + this.props.cacheVersion
       + '&from='
       + this.props.fromTime.toISOString()
       + '&to='
       + this.props.toTime.toISOString();
     setInterval(() => {
       fetch(url, {
         headers: {
           'Access-Control-Allow-Origin': '*',
         },
       })
         .then(res => res.json())
         .then(json => this.setState(() => ({
           values: convertToDataModel(json),
         })));
     }, this.props.reloadTime * 1000);
    //setInterval(() => {
    //  fetch(`https://localhost:44398/api/data`, {
    //    headers: {
    //      'Access-Control-Allow-Origin': '*',
    //    },
    //  })
    //    .then(res => res.json())
    //    .then(json => this.setState(() => ({
    //      values: convertToDataModel(json),
    //    })));
    //  console.log(this.state.values);
    //}, 200000);
  }

  render(): React.ReactNode {
    return (
      <LineChart
        width={600}
        height={300}
        data={this.state.values}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
      >
        <XAxis dataKey="dateTime" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{r: 8}}
        />
      </LineChart>
    );
  }
}
