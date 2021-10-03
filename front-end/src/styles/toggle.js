import React from 'react'

export default function toggle({ theme, toggleTheme }) {
    return (
        <div>
            <button className='btnbtn-primary' onClick={toggleTheme}>{theme === 'light' ? "Light Mode" : "Dark Mode"}</button>
        </div>
    )
}