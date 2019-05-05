import * as React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { DataModel } from '../models/DbRecord';

type GraphProps = {
    values: DataModel[],
};

export const Graph: React.StatelessComponent<GraphProps> = ({ values }: GraphProps) => {
    return (
        <LineChart
            width={900}
            height={450}
            data={values}
            margin={{ right: 60 }}
        >
            <XAxis dataKey="dateTime" />
            <YAxis domain={[-10, 35]}/>
            <CartesianGrid strokeDasharray="3 3"/>
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
};
