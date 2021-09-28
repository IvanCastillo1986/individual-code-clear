import React from 'react'

export default function toggle({ theme, toggleTheme}) {
    console.log(theme)
    return (
        <div onClick={toggleTheme } className='btnbtn-'>
            {theme === 'dark' ? <button className='btnbtn' >Light Mode</button>: <button>Dark Mode</button>}
        </div>
    )
}