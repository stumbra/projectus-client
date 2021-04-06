import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: white;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

   #root {
        height: 100%;
   }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    ${
      '' /* ::-webkit-scrollbar-track {
        border: 7px solid #ebebeb !important;
    }

    ::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #b9e0fa, #2980B9) !important;
        border-radius: 3px !important;
    } */
    }
`;

export default GlobalStyle;
