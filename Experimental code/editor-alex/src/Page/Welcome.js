import React from "react";
import logo from "../call.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  const [count, setCount] = useState(
    <img src={logo} className="App-logo" alt="call" />
  );
  const [countInTimeout, setCountInTimeout] = useState(
    <img src={logo} className="App-logo" alt="call" />
  );

  useEffect(() => {
    setTimeout(() => {
      setCountInTimeout(count);
      <img src={logo} className="App-logo" alt="call" />; // count is 0 here
    }, 3000);
    setCount(<Link to="/code" />); // Update count to be 5 after timeout is scheduled
  }, [count]);

  return (
    <div>
      <h1>Welcome</h1>
      {countInTimeout}

      {/* Count: {count} */}
      {""}
      {/* <img src={logo} className="App-logo" alt="call" /> */}
      {/* {countInTimeout} */}
    </div>
  );
}
