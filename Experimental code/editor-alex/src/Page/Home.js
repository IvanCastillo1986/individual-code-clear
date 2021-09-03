import React from 'react'
import Editor from "@monaco-editor/react"
import { useState } from 'react'

// import Solution from './Solution'

export default function Home() {
    const [input, setInput]= useState([]);
   
    const handleInput = (value, e) => {
        setInput(value) 
    }
    
   const solution = input
 
console.log(solution)
    return (
        <div>
            <h3>Hello Coder</h3>
            <div className="Box">
            <Editor 
               height="70vh"
               width="70vh"
               onChange={handleInput}
               defaultLanguage="javascript"
               defaultValue="// some comment"
               className="edit"
              
          />
          {''}
           <Editor
            height="70vh"
            width="70vh"
            solution
            defaultLanguage="javascript"
            defaultValue="// some comment"
            className="solution"
            />
            </div>
        </div>
    )
}
