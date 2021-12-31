import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const MyResponsiveBar = ({ data }) => {
  return (
    <ResponsiveBar
      data={data}
      keys={["freqavg"]}
      indexBy="time"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      colors="#3182CE"
      animate={true}
      enableLabel={false}
      axisTop={null}
      maxValue="20"
      axisRight={null}
      axisLeft={{
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