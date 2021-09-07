import React from "react";
import Editor from "@monaco-editor/react";

export default function Solution({ sol }) {

  return (
    <div>
      <Editor
        height="70vh"
        width="70vh"
        defaultLanguage="javascript"
        value={sol}
        className="solution"
      />
    </div>
  );
}
