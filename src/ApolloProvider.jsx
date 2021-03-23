import React from 'react';
import { InMemoryCache, createHttpLink, ApolloProvider, ApolloClient } from '@apollo/client';

import App from './App';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
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
