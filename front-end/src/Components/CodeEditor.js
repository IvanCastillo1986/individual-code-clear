import React, { useState } from 'react'
import Editor from '@monaco-editor/react'



export default function CodeEditor() {

    const [input, setInput] = useState('')

    const handleChange = (value, e) => {
        setInput(value)
    }


    return (
        <form className='EditorForm'>
            <Editor 
                className='Editor'
                wrapperClassName='EditorWrapper'
                height='50vh'
                defaultLanguage='javascript'
                defaultValue='// Some comment'
                onChange={handleChange}
            />
            <input type="submit" value="Submit Code" />
        </form>
    )
}
