import { React, useState, useEffect, PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const STANDARD = {
  by_time: "time",
  by_day: "day",
};

const MyCombinedBar = ({ data, standardBy }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={STANDARD[standardBy]} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="freqavg1" fill="#8884d8" />
        <Bar dataKey="freqavg2" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyCombinedBar;
