import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import logo from "./Assets/icons/Logo.png";
import { UserProvider } from "./Providers/UserProvider";
import styled, { ThemeProvider } from "styled-components";
import Containered from "./Components/Containered";
import useLightMode from "./styles/useLightMode";

import { GlobalStyle, lightTheme, darkTheme } from "./styles/globalStyles";
import Toggle from "./styles/toggle";

// This Component is currently set to be exclusive for future URL Routing (in case we use routing)

import Home from "./Pages/Home";
import Report from "./Pages/Report";

const Container = styled.div`
  max-width: 100%;
  margin-top: 500px auto 0;
`;

export default function App() {
  const [theme, toggleTheme] = useLightMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const [count, setCount] = useState("");
  const [countInTimeout, setCountInTimeout] = useState(
    <img src={logo} className="App-logo" alt="call" />
  );

  useEffect(() => {
    setTimeout(() => {
      setCountInTimeout(count);
    }, 3000);
    setCount();
  }, [count]);

  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Navbar />
          <Containered />
          <Switch>
            {!countInTimeout ? (
              <ThemeProvider theme={themeMode}>
                <Container>
                  <GlobalStyle />
                  <Toggle theme={theme} toggleTheme={toggleTheme} />
                  <Route exact path="/" component={Home} className="App" />
                  <Route path="/report" component={Report} />
                </Container>
              </ThemeProvider>
            ) : (
              <div className="App">
                <h1>Welcome</h1>
                <div className="infinite">{countInTimeout}</div>
                <h2 className="CodeClear">Code Clear</h2>
              </div>
            )}
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}
