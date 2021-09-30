import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { apiURL } from "../util/apiURL";
import axios from "axios";
const API = apiURL();

export default function Report() {
  const [stats, setStats] = useState([]);
  const [pieChart, setPieChart] = useState([]);
  const [barChart, setBarChart] = useState([]);
  const [lineChart, setLineChart] = useState([]);
  const [annualDate, setAnnualDate] = useState("");
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
  const handleAnnualDateChange = (e) => {
    setAnnualDate(e.target.value);
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

  const handleLineChartSubmit = (e) => {
    e.preventDefault();
    if (annualDate.length > 0) {
      axios
        .post(`${API}/stats/annual-chart`, { date: annualDate })
        .then((res) => {
          setLineChart([res.data]);
        });
    }
  };

  const lineChartData = () => {
    if (lineChart.length > 0) {
      let allStats = stats.map((elem) => {
        return elem.message_id;
      });
      let labels = allStats.filter((elem, i) => {
        return allStats.indexOf(elem) === i;
      });
      let monthObj = {
        0: ["JAN"],
        1: ["FEB"],
        2: ["MAR"],
        3: ["APR"],
        4: ["MAY"],
        5: ["JUN"],
        6: ["JUL"],
        7: ["AUG"],
        8: ["SEP"],
        9: ["OCT"],
        10: ["NOV"],
        11: ["DEC"],
      };

      labels.forEach((elem, i) => {
        let dataArr = lineChart[0].payload[i];
        for (let j = 0; j < dataArr.length; j++) {
          monthObj[j].push(Number(dataArr[j][`'${elem}'`]));
        }
      });
      let arr = [
        monthObj["0"],
        monthObj["1"],
        monthObj["2"],
        monthObj["3"],
        monthObj["4"],
        monthObj["5"],
        monthObj["6"],
        monthObj["7"],
        monthObj["8"],
        monthObj["9"],
        monthObj["10"],
        monthObj["11"],
      ];
      labels.unshift("Month");
      arr.unshift(labels);
      return arr;
    } else {
      return [
        ["Month", "No Data"],
        ["No Data", 0],
      ];
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

      let filter = allStats.filter((obj) => {
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
      <br />
      <br />
      <div className="charts">
        <h2>Annual code quality chart</h2>
        <form className="reportForms" onSubmit={handleLineChartSubmit}>
          <input
            type="date"
            id="annualDate"
            value={annualDate}
            onChange={handleAnnualDateChange}
          />
          <input type="submit" value="Get Data" />
        </form>
        <br />
        <Chart
          width={"1200px"}
          height={"700px"}
          padding={"10px"}
          chartType="Line"
          loader={<div>Loading Chart</div>}
          data={lineChartData()}
          options={{
            chart: {
              title: "",
              subtitle: "Frequency",
            },
          }}
          rootProps={{ "data-testid": "3" }}
        />
      </div>
      <br />
      <div className="charts">
        <h2>Linter error/warning breakdown</h2>
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
          width={"1200px"}
          height={"700px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={pieChartData()}
          options={{
            title: "",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
      <br />
      <div className="charts">
        <h2>Linter error/warning frequency chart</h2>
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
          width={"1200px"}
          height={"700px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Severity", "2 (Error)", "1 (Warning)", "Combined Total"],
            ["", frequencyObj["2"], frequencyObj["1"], total],
          ]}
          options={{
            title: "",
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
