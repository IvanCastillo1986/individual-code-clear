import React from "react";
import Editor from "@monaco-editor/react";
import { useState } from "react";

import Solution from "./Solution";

export default function Home() {
  const [input, setInput] = useState([]);
  const [sol, setSol] = useState([]);

  const handleInput = (value, e) => {
    setInput(value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSol(input);
  };
  
  console.log(input, "input");
  console.log(sol, "sol");

  return (
    <div>
      <h3>Hello Coder</h3>
      <div className="Box">
        <Editor
          height="70vh"
          width="70vh"
          onChange={handleInput}
          defaultLanguage="javascript"
          defaultValue="// some comment"
          value='home'
          className="edit"
        />
        {""}
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit Code</button>
        </form>
        <Solution sol={sol} />
      </div>
    </div>
  );
}
