import React, { useState, useRef } from "react";
import CodeEditor from "./CodeEditor";
import Results from "./Results";
import GuestStats from "./GuestStats";
import { apiURL } from "../util/apiURL";
import axios from "axios";
import Display from "./Display"

export default function ParentComponent() {
  const [input, setInput] = useState({ input: "// your code here" });
  const [result, setResult] = useState([]);
  const [show, setShow] = useState("Show")
  const API = apiURL();
  const monacoObjects = useRef(null);

  const handleChange = (value, e) => {
    setInput({
      ...input,
      input: value,
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
  function handleEditorDidMount(editor, monaco) {
    monacoObjects.current = { editor, monaco };
  }

  const handleErrorClick = (e) => {
    if (e.currentTarget.dataset.endColumn) {
      monacoObjects.current.editor.setSelection({
        startLineNumber: Number(e.currentTarget.dataset.line),
        startColumn: Number(e.currentTarget.dataset.column),
        endLineNumber: Number(e.currentTarget.dataset.endLine),
        endColumn: Number(e.currentTarget.dataset.endColumn),
      });
    } else {
      monacoObjects.current.editor.setSelection({
        startLineNumber: Number(e.currentTarget.dataset.line),
        startColumn: Number(e.currentTarget.dataset.column),
        endLineNumber: Number(e.currentTarget.dataset.line),
        endColumn: Number(e.currentTarget.dataset.column) + 1,
      });
    }
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
    <div className="part">
      <div className="ParentComponent">
        <CodeEditor
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleEditorDidMount={handleEditorDidMount}
        />
        <Results  result={result} handleErrorClick={handleErrorClick} />
      </div>
      <br />
      {result.length === 0 ? (
        ""
      ) : (
        <div>
          <div>
            <input type="button" id="showbutton" value={show} onClick={showButton}/>
          </div>
          <div className="statsComponent">
          
            <Display input = {input} show={show}/>
            <GuestStats result={result} />
          </div>
        </div>
      )}
    </div>
  );
}
