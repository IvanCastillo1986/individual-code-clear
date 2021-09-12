import { useState, useEffect } from 'react';
import logo from './call.png'
import './App.css';
import {BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom"
import axios from 'axios';
import { apiURL } from './Util/apiURL'

import Home from './Page/Home';
import Welcome from './Page/Welcome'

const API_Dtbased = apiURL()

function App() {
  const [days, setDays] = useState([]);
  let history = useHistory() 
  // const addCode = (newcode) => {}
 
  // const deleteCode = (id) => {}

  const [count, setCount] = useState(
    <img src={logo} className="App-logo" alt="call" />
  );
  const [countInTimeout, setCountInTimeout] = useState(
    <img src={logo} className="App-logo" alt="call" />
  );

  useEffect(() => {
    setTimeout(() => {
      setCountInTimeout(count );
      // <img src={logo} className="App-logo" alt="call" />; // count is 0 here
    }, 3000);
    setCount() // Update count to be 5 after timeout is scheduled
  }, [count, history]);


  // useEffect(() => {
  //   axios.get(`${API_Dtbased}/code`).then((res)=>{
  //     const {data} = res
  //     console.log(data.payload)
  //     setDays(data)
  //   })
  // },[])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCount('Timeout called!');
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  
 console.log(days)
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        {!countInTimeout ? 
        (
        <Route exact path="/users">
           <Home />
          </Route> ) : countInTimeout }
          </Router>
        {/* <Router>
          <Route exact path="/">
            <Welcome />
            <img src={logo} className="App-logo" alt="call" />
            <Link to='/users' className="app-link"><p>Code Cleaner</p></Link> 
          </Route>
          <Route exact path="/users">
           <Home />
          </Route>
        </Router> */}
      </header>
    </div>
  );
}

export default App;
