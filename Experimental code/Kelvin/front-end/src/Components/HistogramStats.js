import React from "react";
import Histogram from "react-chart-histogram";

export default function HistogramStats(props) {
  const { result } = props;
  let frequencyObj = {
    0: 0,
    1: 0,
    2: 0,
  };
  result.map((elem) => {
    frequencyObj[elem.severity]++;
  });
  const severityLevel = ["0", "1", "2"];
  const frequency = [frequencyObj[0], frequencyObj[1], frequencyObj[2]];
  const options = { fillColor: "#000000", strokeColor: "#000000" };
  return (
    <div className="histogram">
      <div>
        <p>Frequency</p>
      </div>
      <div className="chart">
        <Histogram
          xLabels={severityLevel}
          yValues={frequency}
          width="700"
          height="100"
          options={options}
        />
        <p>Severity Level</p>
      </div>
    </div>
  );
}
