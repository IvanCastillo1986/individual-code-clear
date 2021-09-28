import React, { useState, useRef } from "react";
import CodeEditor from "./CodeEditor";
import Editor from "@monaco-editor/react";
import Results from "./Results";
import GuestStats from "./GuestStats";
import { apiURL } from "../util/apiURL";
import axios from "axios";
import Display from "./Display"

export default function ParentComponent() {
  const [input, setInput] = useState({ input: "// your code here" });
  const [result, setResult] = useState([]);
  const [last, setLast] = useState("");
  const [show, setShow] = useState("Show");
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

    console.log(monaco)
    monaco.editor.defineTheme('TeamCodeClearDark', {
      base: 'hc-black',
      colors: {'editor.background': '#2E2735'},
      inherit: true,
      rules: []
    })
    monaco.editor.setTheme('TeamCodeClearDark')
  }
  const handleFixSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3333/eslint/fix", input).then((res) => {
      setLast(res.data.fixedResult[0].output);
    });
  };

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
    monacoObjects.current.editor.focus()
  };

  const showButton = (e) => {
    if (show === "Show") {
      setShow("Hide");
    } else {
      setShow("Show");
    }
  };

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

      <form onSubmit={handleFixSubmit} >
        <button type="submit" value={show} onClick={showButton} className="btnbtn-"> 
          {show}
        </button>
      </form>

      <div className='bothcomponent'>
        <div>
        {show === "Hide" ? (
          <Editor
            height="35vh"
            width="88vh"
            theme="vs-dark"
            defaultLanguage="javascript"
            value={last}
            className="solution"
          />
        ) : null}</div>
     
      {result.length === 0 ? (
        ""
      ) : (
        <div>
          {/* <div>
            <input type="button" id="showbutton" value={show} onClick={showButton}/>
          </div> */}
          <div className="statsComponent">
          
            {/* <Display input = {input} show={show}/> */}
            <GuestStats result={result} />
          </div>
        </div>
      )}
       </div>
    </div>
  );
}
