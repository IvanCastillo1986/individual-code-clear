import React from "react";
import Chart from "react-google-charts";
import { apiURL } from "../util/apiURL";

const API = apiURL();

export default function GuestStats(props) {
  const { result } = props;
  let frequencyObj = {
    1: 0,
    2: 0,
  };
  result.map((elem) => {
    frequencyObj[elem.severity]++;
  });
  return (
    <div>
      <div>
        <Chart
          width={"700px"}
          height={"300px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Severity", "Error", "Warning"],
            ["", frequencyObj["2"], frequencyObj["1"]],
          ]}
          options={{
            title: "Code issue severity",
            chartArea: { width: "50%" },
            colors: ["#b0120a", "#ffab91"],
            hAxis: {
              title: "Frequency",
              minValue: 0,
            },
            vAxis: {
              title: "Severity",
            },
          }}
          // For tests
          rootProps={{ "data-testid": "4" }}
        />
      </div>
    </div>
  );
}
