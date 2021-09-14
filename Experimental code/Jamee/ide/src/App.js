/*eslint-disable*/
import "./App.css";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

function App() {
  const [input, setInput] = useState({ code: "// your code here" });
  const [output, setOutput] = useState([]);

  const handleChange = (value, e) => {
    setInput({ code: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3333/eslint", input).then((response) => {
      setOutput(response.data);
    });
  };

  return (
    <div className="App">
      <h2>Code Editor</h2>
      <form action="" onSubmit={handleSubmit}>
        <Editor
          height="50vh"
          className="Editor"
          onChange={handleChange}
          defaultLanguage="javascript"
          defaultValue="// your code here"
        />
        <input type="submit" value="Submit Code" />
      </form>
    </div>
  );
}

export default App;
