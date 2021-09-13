import React from "react";
import Histogram from "react-chart-histogram";

export default function HistogramStats(props) {
  const { resultInput } = props;
  let frequencyObj = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  resultInput.map((elem) => {
    frequencyObj[elem.severity]++;
  });
  const severityLevel = ["1", "2", "3", "4", "5"];
  const frequency = [
    frequencyObj[1],
    frequencyObj[2],
    frequencyObj[3],
    frequencyObj[4],
    frequencyObj[5],
  ];
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
