import React from 'react'

export default function toggle({ theme, toggleTheme}) {
    console.log(theme)
    return (
        <div onClick={toggleTheme }>
            {theme === 'dark' ? <button classname="toggle">Light Mode</button>: <button>Dark Mode</button>}
        </div>
    )
}