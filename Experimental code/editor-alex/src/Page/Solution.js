import React from "react";
import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function Solution({ sol }) {

    const [sole, setSole] = useState([]);

    // const handleInpu = (value, sol) => {
    
    //     setSole(sol);
    //   };
  return (
    <div>
      <Editor
        height="70vh"
        width="70vh"
        // onChange={handleInpu}
        defaultLanguage="javascript"
        defaultValue="// some comment"
        value={sol}
        className="solution"
      />
      {/* <div className="editor" >
        {sol}
      </div> */}
    </div>
  );
}
