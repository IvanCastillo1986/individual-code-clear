/*eslint-disable*/
import "./App.css";
import React, { useState } from "react";
import Histogram from "react-chart-histogram";

function App() {
  const severity = ["1", "2", "3", "4", "5"];
  const frequency = [3, 4, 5, 1, 0];
  const options = { fillColor: "#000000", strokeColor: "#000000" };

  return (
    <div className="App">
      <div>
        <p className="freq">Frequency</p>
      </div>
      <div className="chart">
        <p>Error severity Histogram</p>
        <Histogram
          xLabels={severity}
          yValues={frequency}
          width="700"
          height="100"
          options={options}
        />
        <p>Severity</p>
      </div>
    </div>
  );
}

export default App;
