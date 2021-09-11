import React from 'react'



export default function Results({ resultInput }) {

    
    return (
        <div className='Results'>
            <h2>Results</h2>
            <ul>
                {
                    resultInput ?
                    resultInput.map((item, i) => {
                        return <li key={i}>{item.message}</li>
                    })
                    : null
                }
            </ul>
        </div>
    )
}
