import React from "react";
import Editor from "@monaco-editor/react";

export default function Came({ last }) {
  return (
    <div>
      <Editor
        height="45vh"
        width="80vh"
        defaultLanguage="javascript"
        value={last}
        className="solution"
      />
    </div>
  );
}
