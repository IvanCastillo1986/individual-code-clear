import React from 'react'



export default function Results({ resultInput }) {

    
    return (
        <div className='Results'>
            <h2>Results</h2>
            <ul>
                <li>{resultInput.name}</li>
            </ul>
        </div>
    )
}
