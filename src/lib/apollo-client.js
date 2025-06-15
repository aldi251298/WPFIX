// lib/apollo-client.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Penting untuk Next.js
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL, // URL GraphQL Anda
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}