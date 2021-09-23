import React from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState, useEffect } from "react";
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home'
import Report from './Pages/Report'
import './App.css'
import logo from './Assets/icons/Logo.png'
import { UserProvider } from './Providers/UserProvider';


// This Component is currently set to be exclusive for future URL Routing (in case we use routing)

export default function App() {
  const [count, setCount] = useState("");
  const [countInTimeout, setCountInTimeout] = useState(
    <img src={logo} className="App-logo" alt="call" />
  );
  useEffect(() => {
    setTimeout(() => {
      setCountInTimeout(count);
    }, 5000);
    setCount();
  }, [count]);

  return (
    <div className='App'>
      <UserProvider>
        <Router>
        <Navbar />
        <Switch>
          {!countInTimeout ? (<Route exact path='/' component={Home} />): (<div >
                <h1>Welcome</h1>
               <div className='infinite'>{countInTimeout}</div>
                <h2 >Code Clear</h2>
              </div> )}
          
          <Route path='/report' component={Report} />
        </Switch>
        </Router>
      </UserProvider>
    </div>
  )
}
