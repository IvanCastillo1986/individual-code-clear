import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { apiURL } from "../util/apiURL";
import axios from "axios";
const API = apiURL();

export default function Report(props) {
  const [stats, setStats] = useState([]);
  const [input, setInput] = useState({
    pieChart: "",
    barChart: "",
    pieDate: "",
    barDate: "",
  });
  const [pieChart, setPieChart] = useState([]);
  const [barChart, setBarChart] = useState([]);
  useEffect(() => {
    axios.get(`${API}/stats`).then((response) => {
      setStats(response.data.payload);
    });
  }, []);
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input[e.target.id] === "Weekly") {
      axios.post(`${API}/stats/weekly`, input.date).then((response) => {
        e.target.id === "pieChart"
          ? setPieChart(response.data)
          : setBarChart(response.data);
      });
    }
  };

  let errors = 241;
  let warnings = 89;
  const total = errors + warnings;
  return (
    <div>
      <h1>Report Page</h1>
      <div className="charts">
        <Chart
          width={"1000px"}
          height={"500px"}
          padding={"10px"}
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
            ["JAN", 13333, 12343, 16782, 9220],
            ["FEB", 12324, 9563, 12357, 7345],
            ["MAR", 10234, 8345, 11324, 8005],
            ["APR", 9546, 6789, 8703, 5678],
            ["MAY", 7845, 5674, 7834, 4567],
            ["JUN", 7344, 5466, 6799, 4401],
            ["JUL", 6774, 4556, 5667, 4138],
            ["AUG", 4123, 3234, 4788, 4018],
            ["SEP", 3444, 2342, 3456, 3888],
            ["OCT", 2345, 2123, 2334, 2538],
            ["NOV", 1233, 1799, 1435, 1658],
            ["DEC", 1060, 904, 782, 658],
          ]}
          options={{
            chart: {
              title: "2021 code quality chart",
              subtitle: "Frequency",
            },
          }}
          rootProps={{ "data-testid": "3" }}
        />
      </div>
      <br />
      <div className="charts">
        <form className="reportForms" id="pieChart" onSubmit={handleSubmit}>
          <select id="pieChart" value={input.pieChart} onChange={handleChange}>
            <option value="--">--</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
          </select>
          <input
            type="date"
            id="pieDate"
            value={input.pieDate}
            onChange={handleChange}
          />
          <input type="submit" value="Get Data" />
        </form>

        <Chart
          width={"1000px"}
          height={"500px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Stat", "Frequency"],
            ["Missing semicolons (WARNING)", 44],
            ["Wrong string quotes (WARNING)", 23],
            ["Wrong indentation (ERROR)", 179],
            ["Unused variable (WARNING)", 22],
            ["Unexpected spaces (ERROR)", 62],
          ]}
          options={{
            title: "Error/warning breakdown",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
      <br />
      <div className="charts">
        <form className="reportForms" id="barChart" onSubmit={handleSubmit}>
          <select id="barChart" value={input.barChart} onChange={handleChange}>
            <option value="--">--</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
          </select>
          <input
            type="date"
            id="barDate"
            value={input.barDate}
            onChange={handleChange}
          />
          <input type="submit" value="Get Data" />
        </form>

        <Chart
          width={"1000px"}
          height={"500px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Severity", "Error", "Warning", "Combined Total"],
            ["", errors, warnings, total],
          ]}
          options={{
            title: "Error/warning frequency chart",
            chartArea: { width: "50%" },
            colors: ["#b0120a", "#ffab91", "#faebd7"],
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
