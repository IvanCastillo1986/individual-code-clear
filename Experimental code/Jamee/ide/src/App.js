/*eslint-disable*/
import "./App.css";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Chart from "react-google-charts";
import axios from "axios";

function App() {
  const [input, setInput] = useState({ input: "// your code here" });
  const [errorResult, setErrorResult] = useState([]);
  const [fixedCode, setFixedCode] = useState(
    "// your fixed code will show here"
  );

  const handleChange = (value, e) => {
    setInput({ input: value });
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3333/eslint", input).then((response) => {
      setErrorResult(response.data.result[0].messages);
    });
  };

  const handleFixSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3333/eslint/fix", input).then((response) => {
      setFixedCode(response.data.fixedResult[0].output);
    });
  };

  return (
    <div className="App">
      <h2>Code Editor</h2>
      <div>
        <form action="" onSubmit={handleCodeSubmit}>
          <Editor
            height="30vh"
            className="Editor"
            onChange={handleChange}
            defaultLanguage="javascript"
            defaultValue="// your code here"
          />
          <input type="submit" value="Submit Code" />
        </form>
      </div>
      <div>
        <form action="" onSubmit={handleFixSubmit}>
          <Editor
            height="30vh"
            className="Editor"
            defaultLanguage="javascript"
            value={fixedCode}
          />
          <input type="submit" value="Get Fixes" />
        </form>
      </div>
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
              title: "Annual Code quality chart",
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
            title: "Daily Error/Warning breakdown",
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
            ["Severity", "Warning", "Error"],
            ["", 12, 23],
          ]}
          options={{
            title: "Population of Largest U.S. Cities",
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

export default App;
