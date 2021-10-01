import React, { useState, useRef } from 'react'
import CodeEditor from './CodeEditor'
import Results from './Results'
import { apiURL } from '../util/apiURL'
import axios from 'axios'


// When each resultInput object gets clicked, there needs to be an onClick event listener attached with a function
// that lets it know to set its current values to the currentError useState

export default function ParentComponent() {
    
    const [input, setInput] = useState({ input: '' })
    const [resultInput, setResultInput] = useState([])
    const API = apiURL()
    const monacoObjects = useRef(null)


    // For Writing into Monaco editor and getting Errors
    const handleChange = (value, e) => {
        setInput({ ...input, input: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            axios.post(`${API}/eslint`, input)
            .then(
                (res) => {setResultInput(res.data.result[0].messages)}
            )
        } catch (c) {
            console.log('Error in ParentComponent: ', c)
        }
        console.log('handleSubmit')
    }

    // For setting theme of Monaco editor
    function handleEditorDidMount(editor, monaco) {
        monacoObjects.current = { editor, monaco }
        console.log('This is the monacoObjects useRef: ', monacoObjects)

        monacoObjects.current.monaco.editor.defineTheme('teamTheme', {
            base: 'hc-black',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#261447',
            }
        })

        monacoObjects.current.monaco.editor.setTheme('teamTheme')
    }

    // For highlighting the error range in Monaco editor
    const handleErrorClick = (e) => {
        if (e.target.dataset.endLine) {
            monacoObjects.current.editor.setSelection({
                startLineNumber: Number(e.target.dataset.line),
                startColumn: Number(e.target.dataset.column),
                endLineNumber: Number(e.target.dataset.endLine),
                endColumn: Number(e.target.dataset.endColumn)
            })
        } else {
            monacoObjects.current.editor.setSelection({
                startLineNumber: Number(e.target.dataset.line),
                startColumn: Number(e.target.dataset.column),
                endLineNumber: Number(e.target.dataset.line),
                endColumn: Number(e.target.dataset.column) + 1
            })
        }
        monacoObjects.current.editor.focus()
    }


    return (
        <div className='ParentComponent'>
            <CodeEditor handleChange={handleChange} handleSubmit={handleSubmit} input={input} handleEditorDidMount={handleEditorDidMount} />
            <CodeEditor handleChange={handleChange} handleSubmit={handleSubmit} input={input} handleEditorDidMount={handleEditorDidMount} />
            <Results resultInput={resultInput} handleErrorClick={handleErrorClick} />
        </div>
    )
}
