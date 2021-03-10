import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body{
        font-family: 'IBM Plex Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    * { 
        box-sizing: border-box;
        margin: 0px;
        padding: 0px; 
    }
`;

export default GlobalStyle;
