import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 400, pv: 2400 },
  { name: 'Feb', uv: 300, pv: 2210 },
  { name: 'Mar', uv: 200, pv: 2290 },
  { name: 'Apr', uv: 278, pv: 2000 },
  { name: 'May', uv: 189, pv: 2181 },
  { name: 'June', uv: 189, pv: 2181 },
  { name: 'July', uv: 189, pv: 2181 },
  { name: 'August', uv: 189, pv: 2181 },
  { name: 'September', uv: 189, pv: 2181 },
  { name: 'October', uv: 189, pv: 2181 },
  { name: 'November', uv: 189, pv: 2181 },
  { name: 'December', uv: 189, pv: 2181 },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
