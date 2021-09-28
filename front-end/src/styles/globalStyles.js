import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
 body{
     background: ${({ theme}) => theme.body};
     color: ${({ theme}) => theme.text};
     transition: all 1s linear;
     color: ${({ theme}) => theme.h2};
     
 }

::-webkit-scrollbar-thumb{
    background: ${({ theme}) => theme.backgroundcolor};
    border-radius: 8px;
    
}
::-webkit-scrollbar-track {
    background: #a9a9a96e;
    border-radius: 8px;
}
p {
    color: ${({ theme}) => theme.text};

}
span {
    color: ${({ theme}) => theme.text};
    margin: auto;
}
Containered {
    background: ${({ theme}) => theme.backgroundcolor};
}
button {
    border-radius: 35px;
    font-size: 20px;
}
`;

export const lightTheme = {
    body: 'linear-gradient( #261447d9, black)',
    text: '#fff',
    textshadow: '3px 5px 2px #177a87, 4px 6px 2px #2ed2e6',
    backgroundcolor: 'gray',
    background: "black",
    h2: 'red',
    boxshadow: 'inset 0 0 5px grey',
    backgroundtext: 'red',
  
}

export const darkTheme = {
    body: 'linear-gradient( white, #975fff, white)',
    text: '#121212',
    textshadow: '3px 5px 2px #177a87, 4px 6px 2px #2ed2e6',
    h2: 'blue',
    boxshadow: 'inset 0 0 5px blue',
    backgroundtext: 'blue',
    backgroundcolor: '#2ed2e6',
    background: "black",
   
    
}

