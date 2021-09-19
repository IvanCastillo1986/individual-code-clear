import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import Results from "./Results";
import HistogramStats from "./HistogramStats";
import { apiURL } from "../util/apiURL";
import axios from "axios";


export default function ParentComponent() {
  const [input, setInput] = useState({ input: "// your code here" });
  const [result, setResult] = useState([]);
  const API = apiURL();
  const handleChange = (value, e) => {
    setInput({ input: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios.post(`${API}/eslint`, input).then((res) => {
        setResult(res.data.result[0].messages);
      });
    } catch (c) {
      console.log("Error in ParentComponent: ", c);
    }
  };

  return (
    <div className='part'>
      <div className="ParentComponent">
        <CodeEditor handleChange={handleChange} handleSubmit={handleSubmit} />
        <Results result={result} />
      </div>
      <br />
      {result.length === 0 ? (
        ""
      ) : (
        <div className="statsComponent">
          <HistogramStats result={result} />
        </div>
      )}
      
    </div>
  );
}
