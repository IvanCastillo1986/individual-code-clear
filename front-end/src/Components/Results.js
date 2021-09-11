import React from 'react'



export default function Results({ resultInput }) {

    if (resultInput.length === 0) {
        return (
        <div>
            <h2>Results</h2>
            <p>Congrats! You have no errors. You are a great coder!</p>
        </div>)
    }
    
    return (
        <div className='Results'>
            <h2>Results</h2>
            <ul>
                {
                    resultInput ?
                    resultInput.map((item, i) => {
                        return (
                        <li key={i}>
                            <span>Error on line {item.line}</span>
                            {item.endColumn ? <span>Columns {item.column} - {item.endColumn}</span> : <span>Column {item.column}</span>}
                            <p>{item.message}</p>
                        </li>
                        )
                    })
                    : null
                }
            </ul>
        </div>
    )
}
