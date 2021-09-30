import React, { useState, useRef } from "react";
import CodeEditor from "./CodeEditor";
import Editor from "@monaco-editor/react";
import Results from "./Results";
import GuestStats from "./GuestStats";
import { apiURL } from "../util/apiURL";
import axios from "axios";
import Display from "./Display";
import styled, { ThemeProvider } from "styled-components";

import { GlobalStyle, lightTheme, darkTheme } from "../styles/globalStyles";
//import  Content  from './Components/Content.js'
import Toggle from "../styles/toggle";
import Containered from "./Containered";

const Container = styled.div`
  max-width: 100%;
  margin: 10px auto 0;
`;

export default function ParentComponent() {
  const [input, setInput] = useState({ input: "// your code here" });
  const [result, setResult] = useState(["Please submit your code"]);
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

    console.log(monaco);
    monaco.editor.defineTheme("TeamCodeClearDark", {
      base: "hc-black",
      colors: { "editor.background": "#2E2735" },
      inherit: true,
      rules: [],
    });
    monaco.editor.setTheme("TeamCodeClearDark");
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
    monacoObjects.current.editor.focus();
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
        <Results
          input={input}
          result={result}
          handleErrorClick={handleErrorClick}
        />
      </div>
      <br />
      <form onSubmit={handleFixSubmit}>
        <button
          type="submit"
          value={show}
          onClick={showButton}
          className="btnbtn-"
        >
          {show}
        </button>
      </form>

      <div className="bothcomponent">
        <div>
          {show === "Hide" && (
            <Editor
              height="36.5vh"
              // height="35vh"
              width="88vh"
              theme="vs-dark"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={last}
              className="solution"
            />
          )}
        </div>

        {result[0] !== "Please submit your code" && (
          <div>
            <div className="statsComponent">
              <GuestStats result={result} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
