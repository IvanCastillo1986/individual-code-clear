import React from "react";
import Editor from "@monaco-editor/react";

export default function Came({ last }) {
  return (
    <div>
      <Editor
        height="50vh"
        width="70vh"
        defaultLanguage="javascript"
        value={last}
        className="solution"
      />
    </div>
  );
}
