import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { apiURL } from "../util/apiURL";
import axios from "axios";

const API = apiURL();

export default function Stats(props) {
  const { result } = props;
  const [stats, setStats] = useState([]);
  useEffect(() => {
    axios.get(`${API}/stats`).then((response) => {
      setStats(response.data.payload);
    });
  }, [result]);
  let frequencyObj = {
    1: 0,
    2: 0,
  };
  stats.map((elem) => {
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
