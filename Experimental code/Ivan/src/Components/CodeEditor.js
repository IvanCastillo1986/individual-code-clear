import React, { useState, useRef } from 'react'
import Editor from '@monaco-editor/react'



export default function CodeEditor() {
    
    const [input, setInput] = useState('')
    const [finalVal, setFinalVal] = useState('')
    const editorRef = useRef(null)
    const monacoRef = useRef(null)
    
    const handleChange = (value, event) => {
        setInput(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
        // setFinalVal(e.target.value)
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
            <form action="" onSubmit={handleSubmit}>
                <Editor 
                wrapperClassName='EditorWrapper'
                className='Editor'
                onChange={handleChange}
                width='60%'
                height='40vh'
                defaultLanguage='javascript'
                defaultValue='// some comment'
                beforeMount={handleEditorWillMount}
                onMount={handleEditorDidMount}
                value={input}
                />
                <p>{input}</p>
                <input type="submit" value="Submit Code" />
            </form>
        </div>
    )
}








// MONACO EDITOR NOTES
// The editor instance does not perform computations for us.
// It's pretty much just an area where you can write text.
// It's got a bunch of nested divs built into it for UI/UX reasons
// It looks for patterns in the text that are considered bad code, and provides syntax error
// markers when the patterns signify what is programmed as bad code somewhere in Monaco Editor's
// files.
// It lets us customize many UI/functional options.
// When you start to inspect the portion of the DOM that takes user input text, you find the <div>,
// which holds a <span> element, which actually holds <spans> which holds this user input text.
    // Each line in the Editor is:
    // comprised of two <span> elements
        // First span takes the first word in the line, before the first space
        // Second span takes the rest of the text in the line
    // styled with a height of 18
    // positioned absolutely at a multiple of 18px from the top when added, from it's parent 
    // container <div class='view-lines'>, another div that is positioned absolutely.
    // It's a mess of nested <div>s, with the parent div of this entire text area being:
        // <div class='monaco-scrollable-element editor-scrollable vs mac'>





// refs are used when we need to establish a direct connection between components and DOM elements
    // OR child components and their parent components.
// refs can also be misused, so it's recommended that you use it sparingly.
// Some appropriate times to use refs is when you need to:
    // Manage focus, text selection, or media playback
    // Perform imperative animations
    // Integrate with third-party DOM libraries
