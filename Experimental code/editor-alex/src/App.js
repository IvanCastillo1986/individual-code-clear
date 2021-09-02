import logo from './call.png'
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"


import Home from './Page/Home';

function App() {
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
