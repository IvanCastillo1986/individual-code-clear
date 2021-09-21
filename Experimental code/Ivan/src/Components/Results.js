import React from 'react'



export default function Results({ resultInput, handleErrorClick }) {

    
    return (
        <div className='Results'>
            <h2>Results</h2>
            <ul>
                {
                    resultInput ?
                    resultInput.map((item, i) => {
                        return (
                        <li key={i} 
                        data-column={item.column} 
                        data-line={item.line} 
                        data-end-line={item.endLine}
                        data-end-column={item.endColumn}
                        onClick={handleErrorClick}>
                            {item.message}
                        </li>
                        )
                    })
                    : null
                }
            </ul>
        </div>
    )
}
