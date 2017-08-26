import React from 'react';
import { StackNavigator } from 'react-navigation'

import HomeScreen from './src/screens/HomeScreen';
import RestaurantListing from './src/screens/RestaurantListing';

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Restaurant: { screen: RestaurantListing }
})

export default App;