import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import axios from "axios";

export default function Stats(props) {
  const { errorResult } = props;
  const [stats, setStats] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3333/stats").then((response) => {
      setStats(response.data.payload);
    });
  }, [errorResult]);
  let frequencyObj = {
    1: 0,
    2: 0,
  };
  stats.map((elem) => {
    frequencyObj[elem.severity]++;
  });
  return (
    <>
      <div>
        <Chart
          width={"1000px"}
          height={"400px"}
          chartType="Line"
          loader={<div>Loading Chart</div>}
          data={[
            [
              "Month",
              "Wrong string quotes",
              "Missing semicolons",
              "Wrong indentation",
              "Trailing spaces",
            ],
            ["JAN", 10, 80.8, 41.8, 40.8],
            ["FEB", 30.9, 69.5, 32.4, 44.8],
            ["MAR", 25.4, 57, 25.7, 41.8],
            ["APR", 11.7, 18.8, 10.5, 42.8],
            ["MAY", 11.9, 17.6, 10.4, 41.8],
            ["JUN", 8.8, 13.6, 7.7, 44.8],
            ["JUL", 7.6, 12.3, 9.6, 44.8],
            ["AUG", 12.3, 29.2, 10.6, 41.8],
            ["SEP", 16.9, 42.9, 14.8, 34.8],
            ["OCT", 12.8, 30.9, 11.6, 23.8],
            ["NOV", 5.3, 7.9, 4.7, 56.8],
            ["DEC", 6.6, 8.4, 5.2, 45.8],
          ]}
          options={{
            chart: {
              title: "Annual 2021 code quality chart",
              subtitle: "Frequency",
            },
          }}
          rootProps={{ "data-testid": "3" }}
        />
      </div>
      <div>
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Stat", "Frequency"],
            ["Missing semicolons", 23],
            ["Wrong string quotes", 14],
            ["Wrong indentation", 9],
            ["Unused variable", 4],
            ["Unexpected spaces", 11],
          ]}
          options={{
            title: "Daily code quality breakdown",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
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
    </>
  );
}
