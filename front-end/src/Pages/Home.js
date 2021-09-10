import React from 'react'
import CodeEditor from '../Components/CodeEditor'
import './Home.css'



export default function Home() {


    return (
        <div className='Home'>
            <h1>Welcome to CodeClear!</h1>
            <main>
                <CodeEditor />
            </main>
        </div>
    )
}
