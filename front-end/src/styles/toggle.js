import React from 'react'

export default function toggle({ theme, toggleTheme}) {
    console.log(theme)
    return (
        <div onClick={toggleTheme } >
            {theme === 'dark' ? <button className='btnbtn-primary' >Light Mode</button>: <button className='btnbtn-primary'>Dark Mode</button>}
        </div>
    )
}