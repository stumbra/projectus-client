import 'semantic-ui-css/semantic.min.css';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import Router from './routes/Router';

import GlobalStyles from './theme/globalStyles';
import DefaultStyles from './theme/defaultStyles';

import { SemanticToastContainer } from 'react-semantic-toasts';

function App() {
  return (
    <ThemeProvider theme={DefaultStyles}>
      <SemanticToastContainer position="top-right" />
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}

export default App;
