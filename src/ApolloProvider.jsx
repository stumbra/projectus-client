import React from 'react';
import { InMemoryCache, createHttpLink, ApolloProvider, ApolloClient } from '@apollo/client';

import App from './App';

const link = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
