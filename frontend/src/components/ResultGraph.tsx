import * as React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { getData } from '../actions/thunks/getData';


export type ResultGraphOwnProps = {
};

export const ResultGraph: React.StatelessComponent<ResultGraphOwnProps> = () => {
  const values = getData().toArray();
  return (
    <LineChart
      width={600}
      height={300}
      data={values}
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
};

ResultGraph.displayName = 'ResultGraph';
