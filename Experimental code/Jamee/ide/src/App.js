/*eslint-disable*/
import "./App.css";
import Editor from "@monaco-editor/react";
import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const handleChange = (value, e) => {
    setInput(value);
  };
  return (
    <div className="App">
      <Editor
        onChange={handleChange}
        height="90vh"
        defaultLanguage="javascript"
      />
      {/* eslint-enable */}
      {input}
      {/* eslint-disable */}
    </div>
  );
}

export default App;
