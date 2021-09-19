import React from 'react'
import Home from './Pages/Home'
import './App.css'

import { UserProvider } from './Providers/UserProvider';
import Navbar from './Components/Navbar';

// This Component is currently set to be exclusive for future URL Routing (in case we use routing)

export default function App() {
  return (
    <div className='App'>
      <UserProvider>
        <Navbar />
        <Home />
      </UserProvider>
    </div>
  )
}
