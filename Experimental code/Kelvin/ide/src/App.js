/*eslint-disable*/
import "./App.css";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Chart from "react-google-charts";
import axios from "axios";
import Display from "./Display"
function App() {
  const [input, setInput] = useState({ input: "// your code here" });
  const [errorResult, setErrorResult] = useState([]);

  const [show, setShow] = useState("Show")
  const handleChange = (value, e) => {
    setInput({ input: value });
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3333/eslint", input).then((response) => {
      setErrorResult(response.data.result[0].messages);
    });
  };


  const showButton = (e) => {
    if (show === "Show"){
      setShow("Hide")
    }
    else {
      setShow("Show")
    }
  }  
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
        <input type="button" id="showbutton" value={show} onClick={showButton}/>
        <Display show={show}/>
      </div>
      
    </div>
  );
}

export default App;
