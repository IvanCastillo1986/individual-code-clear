import React from 'react'
import ParentComponent from '../Components/ParentComponent'
import './Home.css'



// This component currently has no state or functionality, as per Pursuit MVC recommendations 
// for Page components

export default function Home() {


    return (
        <div className='Home'>
            <div className='Topbar'>
                <h1>Welcome to Code Clear</h1>
            </div>
            <ParentComponent />
        </div>
    )
}
