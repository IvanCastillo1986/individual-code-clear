import React from "react";
import ParentComponent from "../Components/ParentComponent";
import "./Home.css";
import Containered from "../Components/Containered";
import styled, { ThemeProvider } from "styled-components";
import useDarkMode from "../styles/useLightMode";
import { GlobalStyle, lightTheme, darkTheme } from "../styles/globalStyles";
//import  Content  from './Components/Content.js'
import Toggle from "../styles/toggle";

// This component currently has no state or functionality, as per Pursuit MVC recommendations
// for Page components
const Container = styled.div`
  max-width: 100%;
  margin: 10px auto -5;
`;

export default function Home() {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  return (
    <>
      <Containered />
      <div>
        <ThemeProvider theme={themeMode}>
          <Container>
            <GlobalStyle />
            <Toggle theme={theme} toggleTheme={toggleTheme} />
            <div className="Home">
              <ParentComponent />
            </div>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}
