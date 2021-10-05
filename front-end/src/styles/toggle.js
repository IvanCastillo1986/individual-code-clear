import React from 'react'


export default function toggle({ theme, toggleTheme}) {
    console.log(theme)
    return (
        <div onClick={toggleTheme } >
            {theme === 'light' ? <button className='btnbtn-primary' >Light Mode</button>: <button className='btnbtn-primary'>Dark Mode</button>}
            {/* {theme === "light" ?  ( <img src={logoType} alt="call" />) : (<img src={logoType2} alt="call" s className='logoType'/>)
  } */}
  
        </div>
    )
}