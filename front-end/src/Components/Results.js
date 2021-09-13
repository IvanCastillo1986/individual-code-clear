import React from 'react'



export default function Results({ resultInput: result }) {

    if (result.length === 0) {
        return (
        <div className='Results'>
            <h2>Results</h2>
            <h3>Congrats! You have no errors.</h3>
            <h3>You are a great coder!</h3>
        </div>)
    }
    
    return (
        <div className='Results'>
            <h2>Results</h2>
            <ul>
                {
                    result ?
                    result.map((item, i) => {
                        return (
                        <li key={i}>
                            <span>Error on line {item.line}</span>
                            {item.endColumn ? <span>Columns {item.column} - {item.endColumn}</span> : <span>Column {item.column}</span>}
                            <p>{item.message}</p>
                            <hr />
                        </li>
                        )
                    })
                    : null
                }
            </ul>
        </div>
    )
}
