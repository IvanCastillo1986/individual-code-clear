import React, { useState } from 'react'
import CodeEditor from './CodeEditor'
import Results from './Results'



export default function ParentComponent() {

    const [input, setInput] = useState('')
    const [finalInput, setFinalInput] = useState('')
    const handleChange = (value, e) => {
        setInput(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setFinalInput(input)
        console.log('handleSubmit')
    }


    return (
        <div className='ParentComponent'>
            <CodeEditor handleChange={handleChange} handleSubmit={handleSubmit} />
            <Results handleSubmit={handleSubmit} />
        </div>
    )
}
