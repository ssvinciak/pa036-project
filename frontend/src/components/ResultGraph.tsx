import * as React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { DataModel } from '../models/DbRecord';

const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};

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
  reloadTime: number,
  url: string,
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
    setInterval(() => {
      fetch(this.props.url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then(res => res.json())
        .then(json => this.setState(() => ({
          values: convertToDataModel(json),
        })));
    }, this.props.reloadTime * 1000);
  }

  render(): React.ReactNode {
    console.log(this.props);
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
