import * as React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { DataModel } from '../models/DbRecord';

export type ResultGraphOwnProps = {
  fromTime: Date,
  toTime: Date,
  reloadTime: number,
};

type ResultGraphState = {
  values: DataModel[];
};

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

export class ResultGraph extends React.PureComponent<ResultGraphOwnProps, ResultGraphState> {
  static displayName = 'ResultGraph';

  constructor(props: any) {
    super(props);
    this.state = {
      values: [],
    };
  }

  componentDidMount() {
    // const url = 'https://localhost:44398/api/data/from=' + this.props.fromTime + '&to=' + this.props.toTime;
    // setInterval(() => {
    //   fetch(url, {
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //     },
    //   })
    //     .then(res => res.json())
    //     .then(json => this.setState(() => ({
    //       values: json,
    //     })));
    //   console.log(this.state.values);
    // }, this.props.reloadTime);
    setInterval(() => {
      fetch(`https://localhost:44398/api/data`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then(res => res.json())
        .then(json => this.setState(() => ({
          values: convertToDataModel(json),
        })));
      console.log(this.state.values);
    }, 200000);
  }

  render(): React.ReactNode {
    return (
      <LineChart
        width={600}
        height={300}
        data={this.state.values}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}
