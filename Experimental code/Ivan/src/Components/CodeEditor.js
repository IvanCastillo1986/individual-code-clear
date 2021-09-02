import React from 'react'
import Editor from '@monaco-editor/react'


export default function CodeEditor() {


    return (
        <div>
            <h1>Code Editor</h1>
            <Editor 
            className='Editor'
            height='40vh'
            defaultLanguage='javascript'
            defaultValue='// some comment'
            />
        </div>
    )
}

