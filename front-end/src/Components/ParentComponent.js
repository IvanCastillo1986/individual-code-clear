import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import Results from "./Results";
import Stats from "./Stats";
import { apiURL } from "../util/apiURL";
import axios from "axios";

export default function ParentComponent() {
  const [input, setInput] = useState({ input: "// your code here", date: "" });
  const [result, setResult] = useState([]);
  const API = apiURL();
  const handleChange = (value, e) => {
    setInput({
      ...input,
      input: value,
    });
  };
  const handleDateChange = (e) => {
    setInput({
      ...input,
      date: e.target.value,
    });
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
    <div className="part">
      <div className="ParentComponent">
        <CodeEditor
          input={input}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          handleSubmit={handleSubmit}
        />
        <Results result={result} />
      </div>
      <br />
      {result.length === 0 ? (
        ""
      ) : (
        <div className="statsComponent">
          <Stats result={result} />
        </div>
      )}
    </div>
  );
}
