import { React, useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";

const colors = {
  월: "blue",
  화: "blue",
  수: "blue",
  목: "blue",
  금: "blue",
  토: "red",
  일: "red",
};
const standard = {
  by_time: "time",
  by_day: "day",
};
const getColor = (bar) => colors[bar.indexValue];
const MyResponsiveBar = ({ data, standardBy }) => {
  return (
    <ResponsiveBar
      colors={getColor}
      data={data}
      keys={["freqavg"]}
      indexBy={standard[standardBy]}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      animate={true}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        format: (e) => Math.floor(e) === e && e,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "배달 건수",
        legendPosition: "middle",
        legendOffset: -40,
      }}
    />
  );
};

export default MyResponsiveBar;
