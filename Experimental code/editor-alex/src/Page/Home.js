import React from 'react'
import Editor from "@monaco-editor/react"

export default function Home() {
    return (
        <div>
            <h3>Hola Coder</h3>
            <Editor 
               height="70vh"
               width="70vh"
               defaultLanguage="javascript"
               defaultValue="// some comment"
               className="editor"
          />
        </div>
    )
}
