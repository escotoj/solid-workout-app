import React from 'react';
import createRoot from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'; // Import ApolloProvider, ApolloClient, and InMemoryCache
import auth from './utils/auth';
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot.render(
  <ApolloProvider client={client}> {/* Wrap App component with ApolloProvider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
