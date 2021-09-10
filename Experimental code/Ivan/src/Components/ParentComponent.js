import React, { useState } from 'react'
import CodeEditor from './CodeEditor'
import Results from './Results'
import { apiURL } from '../util/apiURL'
import axios from 'axios'



export default function ParentComponent() {

    const [input, setInput] = useState({
        name: ''
    })
    const [resultInput, setResultInput] = useState({})
    const API = apiURL()
    const handleChange = (value, e) => {
        setInput({ ...input, name: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        try {

            axios.post(`${API}/code`, input)
            .then(
                (res) => {setResultInput(res.data.payload)}
            )
        } catch (c) {
            console.log('Error in ParentComponent: ', c)
        }

        console.log('handleSubmit')
    }


    return (
        <div className='ParentComponent'>
            <CodeEditor handleChange={handleChange} handleSubmit={handleSubmit} />
            <Results resultInput={resultInput} />
        </div>
    )
}
