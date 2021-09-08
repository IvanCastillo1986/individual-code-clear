import { useState, useEffect } from 'react';
import logo from './call.png'
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import axios from 'axios';
import { apiURL } from './Util/apiURL'

import Home from './Page/Home';

const API_Dtbased = apiURL()

function App() {
  const [days, setDays] = useState([]);

  // const addCode = (newcode) => {}

  // const deleteCode = (id) => {}

  useEffect(() => {
    axios.get(`${API_Dtbased}/code`).then((res)=>{
      const {data} = res
      console.log(data.payload)
      setDays(data)
    })
  },[])
 console.log(days)
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Route exact path="/">
            <img src={logo} className="App-logo" alt="call" />
            <Link to='/users' className="app-link"><p>Code Cleaner</p></Link> 
          </Route>
          <Route exact path="/users">
           <Home />
          </Route>
        </Router>
      </header>
    </div>
  );
}

export default App;
