/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';

import App from './App';
import { yelpAccessToken } from './tokens';

const networkInterface = createNetworkInterface({
  uri: 'https://api.yelp.com/v3/graphql',
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }

      req.options.headers.authorization = yelpAccessToken ? `Bearer ${yelpAccessToken}` : null;
      next();
    },
  },
]);

const client = new ApolloClient({
  networkInterface,
});

const MunchieApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

AppRegistry.registerComponent('munchie', () => MunchieApp);
