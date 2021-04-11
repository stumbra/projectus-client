import React from 'react';
import {
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  ApolloClient,
} from '@apollo/client';

import App from './App';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
