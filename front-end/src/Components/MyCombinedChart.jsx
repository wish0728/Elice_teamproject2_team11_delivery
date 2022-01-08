import { React, useState, useEffect, PureComponent } from "react";
import { ResponsiveLine } from "@nivo/line";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MyCombinedChart = ({ data, standardBy }) => {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="year_month" scale="band" />
        <YAxis
          type="number"
          yAxisId="left"
          label={{ value: "원", offset: 30, angle: 0, position: "left" }}
        />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="right" dataKey="배달건수" barSize={20} fill="#413ea0" />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="전달대비 확진자 증감수"
          stroke="#ff7300"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default MyCombinedChart;
