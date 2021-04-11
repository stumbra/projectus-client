import 'semantic-ui-css/semantic.min.css';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import 'react-tippy/dist/tippy.css';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import Router from './routes/Router';

import common_en from 'src/dictionary/en/common.json';
import common_lt from 'src/dictionary/lt/common.json';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import GlobalStyles from 'src/theme/globalStyles';
import DefaultStyles from 'src/theme/defaultStyles';

import { SemanticToastContainer } from 'react-semantic-toasts';

import { AuthProvider } from './context/auth';

i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem('LANGUAGE')
    ? localStorage?.getItem('LANGUAGE')?.toString()
    : 'en',
  resources: {
    en: {
      common: common_en,
    },
    lt: {
      common: common_lt,
    },
  },
});

const App: React.FC = (): React.ReactElement => {
  return (
    <ThemeProvider theme={DefaultStyles}>
      <SemanticToastContainer position="top-right" />
      <GlobalStyles />
      <AuthProvider>
        <I18nextProvider i18n={i18next}>
          <Router />
        </I18nextProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
