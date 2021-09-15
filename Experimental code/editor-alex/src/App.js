import { useState, useEffect } from "react";
import logo from "./call.png";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Page/Home";
import Save from "./Page/Save";

function App() {
  // const addCode = (newcode) => {}

  // const deleteCode = (id) => {}

  const [count, setCount] = useState("");
  const [countInTimeout, setCountInTimeout] = useState(
    <img src={logo} className="App-logo" alt="call" />
  );

  useEffect(() => {
    setTimeout(() => {
      setCountInTimeout(count);
      // count is 0 here
    }, 5000);
    setCount(); // Update count to be 5 after timeout is scheduled
  }, [count]);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            {!countInTimeout ? (
              <Route exact path="/">
                <Home />
              </Route>
            ) : (
              <div >
                <h1>Welcome</h1>
                {countInTimeout}
                <h2 >Code Clear</h2>
              </div>
            )}
            {/* <Route exact path="/code">
              <Save />
            </Route> */}
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
