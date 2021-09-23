import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home'
import Report from './Pages/Report'
import './App.css'

import { UserProvider } from './Providers/UserProvider';


// This Component is currently set to be exclusive for future URL Routing (in case we use routing)

export default function App() {


  return (
    <div className='App'>
      <UserProvider>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/report' component={Report} />
        </Switch>
      </UserProvider>
    </div>
  )
}
