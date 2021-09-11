import React, { useRef } from 'react'
import Editor from '@monaco-editor/react'

export default function CodeEditor({ handleChange, handleSubmit }) {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editor.focus();
        editor.setPosition({ column: 18, lineNumber: 1 });
        editorRef.current = editor;
    }

    const goToErrorPosition = (lineNumber, column) => {
        editorRef.current.focus();
        editorRef.current.setPosition({ lineNumber, column });
    }

    return (
        <div className='CodeEditor'>
            <h2>Code Editor</h2>
            <form action="" onSubmit={handleSubmit}>
                <Editor
                    className='Editor'
                    onChange={handleChange}
                    defaultLanguage='javascript'
                    defaultValue='// your code here'
                    onMount={handleEditorDidMount}
                />
                <input type="submit" value="Submit Code" />
            </form>
            <p onClick={() => goToErrorPosition(1, 9)}>line 1 column 9 there is an error (click me will get you there)</p>
        </div>
    )
}
