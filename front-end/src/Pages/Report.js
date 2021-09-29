import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { apiURL } from "../util/apiURL";
import axios from "axios";
const API = apiURL();

export default function Report(props) {
  const [stats, setStats] = useState([]);
  const [pieChart, setPieChart] = useState([]);
  const [barChart, setBarChart] = useState([]);

  const [select, setSelect] = useState({
    pieChart: "",
    barChart: "",
  });

  const [date, setDate] = useState({
    pieChart: "",
    barChart: "",
  });

  useEffect(() => {
    axios.get(`${API}/stats`).then((response) => {
      setStats(response.data.payload);
    });
  }, []);
  const handleSelectChange = (e) => {
    setSelect({
      ...select,
      [e.target.id]: e.target.value,
    });
  };
  const handleDateChange = (e) => {
    setDate({
      ...date,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (select[e.target.id]) {
      case "Daily":
        axios
          .post(`${API}/stats/daily`, {
            date: date[e.target.id],
            type: e.target.id === "pieChart" ? "pieChart" : "barChart",
          })
          .then((response) => {
            e.target.id === "pieChart"
              ? setPieChart([response.data])
              : setBarChart([response.data]);
          });
        break;
      case "Weekly":
        axios
          .post(`${API}/stats/weekly`, {
            date: date[e.target.id],
            type: e.target.id === "pieChart" ? "pieChart" : "barChart",
          })
          .then((response) => {
            e.target.id === "pieChart"
              ? setPieChart([response.data])
              : setBarChart([response.data]);
          });
        break;
      case "Monthly":
        axios
          .post(`${API}/stats/monthly`, {
            date: date[e.target.id],
            type: e.target.id === "pieChart" ? "pieChart" : "barChart",
          })
          .then((response) => {
            e.target.id === "pieChart"
              ? setPieChart([response.data])
              : setBarChart([response.data]);
          });
        break;
      case "Annually":
        axios
          .post(`${API}/stats/annually`, {
            date: date[e.target.id],
            type: e.target.id === "pieChart" ? "pieChart" : "barChart",
          })
          .then((response) => {
            e.target.id === "pieChart"
              ? setPieChart([response.data])
              : setBarChart([response.data]);
          });
        break;
    }
  };

  const pieChartData = () => {
    if (pieChart.length > 0) {
      let allStats = stats.map((elem) => {
        return {
          name: elem.message_id,
          message: elem.message,
          severity: elem.severity,
        };
      });
      const uniqueValuesSet = new Set();

      let filter = allStats.filter((obj, i) => {
        const isPresentInSet = uniqueValuesSet.has(obj.name);
        uniqueValuesSet.add(obj.name);
        return !isPresentInSet;
      });
      let data = filter.map((elem, i) => {
        return [
          elem.name + `: (${elem.severity})`,
          Number(pieChart[0].payload[i][`'${elem.name}'`]),
        ];
      });
      data.unshift(["Stat", "Frequency"]);
      return data;
    } else {
      return [["Stat", "Frequency"]];
    }
  };

  let frequencyObj = {
    1: 0,
    2: 0,
  };

  if (barChart.length > 0) {
    barChart[0].payload.forEach((elem) => {
      frequencyObj[elem.severity]++;
    });
  }

  const total = frequencyObj["1"] + frequencyObj["2"];
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
          <select
            id="pieChart"
            value={select.pieChart}
            onChange={handleSelectChange}
          >
            <option value="--">--</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
          </select>
          <input
            type="date"
            id="pieChart"
            value={date.pieChart}
            onChange={handleDateChange}
          />
          <input type="submit" value="Get Data" />
        </form>

        <Chart
          width={"1000px"}
          height={"500px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={pieChartData()}
          options={{
            title: "Linter error/warning breakdown",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
      <br />
      <div className="charts">
        <form className="reportForms" id="barChart" onSubmit={handleSubmit}>
          <select
            id="barChart"
            value={select.barChart}
            onChange={handleSelectChange}
          >
            <option value="--">--</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
          </select>
          <input
            type="date"
            id="barChart"
            value={date.barChart}
            onChange={handleDateChange}
          />
          <input type="submit" value="Get Data" />
        </form>

        <Chart
          width={"1000px"}
          height={"500px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Severity", "2 (Error)", "1 (Warning)", "Combined Total"],
            ["", frequencyObj["2"], frequencyObj["1"], total],
          ]}
          options={{
            title: "Linter error/warning frequency chart",
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
