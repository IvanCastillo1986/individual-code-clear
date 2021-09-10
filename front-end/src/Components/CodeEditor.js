import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import axios from "axios";
import { apiURL } from '../util/apiURL';

const url = apiURL();

export default function CodeEditor() {

    const [input, setInput] = useState('')

    const handleChange = (value, e) => {
        console.log("change:", value)
        setInput(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(`${url}/eslint`, { input });
        console.log(data);
    }

    return (
        <form className='EditorForm' onSubmit={handleSubmit}>
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
