/*eslint-disable*/
import "./App.css";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
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
    </div>
  );
}

export default App;
