import React, { useState, useRef } from 'react'
import Editor from '@monaco-editor/react'



export default function CodeEditor() {
    
    const [input, setInput] = useState('')
    const editorRef = useRef(null)
    const monacoRef = useRef(null)
    
    const handleChange = (value, event) => {
        setInput(value)
    }
    
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor
    }
    
    function handleEditorWillMount(editor, monaco) {
        monacoRef.current = monaco
    }
    
    console.log('monacoRef: ', monacoRef)    // Shows an object with current: null on pageload, shows current: undefined on re-render
    console.log('editorRef: ', editorRef)    // Shows an object with current: null on pageload, shows current: T on re-render
    console.log('Editor: ', Editor)    // Shows the Editor instance's properties



    return (
        <div>
            <h1>Code Editor</h1>
            <Editor 
            className='MyEditor'
            onChange={handleChange}
            height='40vh'
            defaultLanguage='javascript'
            defaultValue='// some comment'
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
            />
            <p>{input}</p>
        </div>
    )
}







// refs are used when we need to establish a direct connection between components and DOM elements
    // OR child components and their parent components.
// refs can also be misused, so it's recommended that you use it sparingly.
// Some appropriate times to use refs is when you need to:
    // Manage focus, text selection, or media playback
    // Perform imperative animations
    // Integrate with third-party DOM libraries
