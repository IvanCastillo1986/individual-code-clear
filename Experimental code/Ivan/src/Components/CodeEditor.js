import React, { useState, useRef, useEffect } from 'react'
import Editor, { loader } from '@monaco-editor/react'



export default function CodeEditor({ handleChange, handleSubmit }) {

    const editorRef = useRef(null)
    const monacoRef = useRef(null)

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor
        monacoRef.current = monaco
        console.log('This is the Editor Instance: ', editorRef.current)
        console.log('This is ALSO the monaco instance:: ', monacoRef.current)
        monacoRef.current.editor.defineTheme('teamTheme', {
            base: 'vs',
            inherit: true,
            rules: [{
                // token: '',
                // foreground: '',
                // background: '',
                // fontStyle: ''
            }],
            colors: {
                'editor.background': '#000000',
            }
        })
    }

    function showValue() {
        alert(editorRef.current.getValue())
        console.log(editorRef.current.getValue())
    }


    return (
        <div className='CodeEditor'>
            <h2>Code Editor</h2>
            <form action="" onSubmit={handleSubmit}>
                <Editor 
                // In the React docs, these are props
                    className='Editor'
                    wrapperClassName='EditorWrapper'
                    onChange={handleChange}
                    defaultLanguage='javascript'
                    defaultValue='// some comment'
                    loading='Our App Will Change Your Life...'
                    theme='teamTheme'
                    // theme='vs-dark'
                    options={{ // In the Monaco docs, this is accessed through IStandAloneEditorConstructionOptions
                        fontSize: '18px',
                        fontWeight: 'bold',
                        renderLineHighlight: 'gutter',
                        rulers: [{column: 3, color: 'purple'}],
                        selectionHighlight: false, // not sure
                        columnSelection: false, // not sure
                        // model: null  // This option stops React from automatically creating new model onMount
                        showUnused: true, // not sure
                    }}
                    onMount={handleEditorDidMount}
                />
                <input type="submit" value="Submit Code" />
                <button onClick={showValue}>Get Value</button>
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



// The Editor border only appears after the Editor is done being loaded.
    // My theory to display Splash Screen is that:
    // When you pause the browser during Loading... , you can inspect the element
    // You can see that the 'Loading...' is displayed inside of a div
        // This div is the first child of EditorWrapper
        // It is the sibling of the Editor <div>, which is not displayed yet
    // If we can access the firstChild of EditorWrapper, we might be able to access the node
    // at the point of which we can diplsya what we want with a ternary, before the 
    // Editor is done being Loaded.

