import React from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import {Switch, Link, Route} from 'react-router-dom'
import './App.css'



// This Component is currently set to be exclusive for future URL Routing (in case we use routing)

export default function App() {


  return (
    <div className='App'>
          <nav className="Navbar">
            <Link to='/' className="Navbar-Items">
              <img src="https://www.blueadvantage.ca/collat/companyLogo/company000010.png"/>
            </Link>

            <Link to='/about' className="Navbar-About">About</Link>
          </nav>
          <Switch>
            <Route exact path='/' component={Home} /> 
            <Route path='/about' component={About} />
          </Switch>
    </div>
  )
}
