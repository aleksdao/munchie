import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {
//   Heading,
//   Button as ShoutemButton,
//   NavigationBar,
//   Title,
//   Icon as ShoutemIcon,
// } from '@shoutem/ui';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-geolocation';

import AppText from '../components/reusable/Text';
// import singleBusiness from '../../mocks/single-business.json';
// import multipleBusinesses from '../../mocks/multiple-businesses.json';
import Map from '../components/Map';
// import TimeToRestaurant from './TimeToRestaurant';

const accessToken =
  'snA4wAMSGgqMlYh4Ap-ZGTxqTiPrXmKMhMywrriQGlXa0o67PbbDuGQuF19A9UCkd847Fnd63IDqdOSMnXbpsWs_Z_AFWV8gThNfgKmuY7uC_DfgNlUm5k-wHrt7WXYx';

const yelpAPIurls = {
  search: 'https://api.yelp.com/v3/businesses/search',
  business: 'https://api.yelp.com/v3/businesses/',
};

const defaultConfig = {
  headers: new Headers({
    'content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }),
  method: 'GET',
};

function PromptContainer({ children }) {
  return (
    <View style={styles.promptContainer}>
      {children}
    </View>
  );
}

function Prompt() {
  return (
    <View style={{ backgroundColor: 'transparent' }}>
      <Text
        style={{
          marginBottom: 5,
          fontFamily: 'Helvetica Neue',
          color: 'white',
          fontWeight: 'bold',
          fontSize: 32,
        }}
      >
        What's for Dinner?
      </Text>
    </View>
  );
}

function Clever() {
  return (
    <Text style={[{ backgroundColor: 'transparent', color: 'white' }, styles.marginBottom]}>
      Decision Fatigue? We got you.
    </Text>
  );
}

function LocationPrompt({ fetchRestaurants, onSearchInput }) {
  return (
    <View style={[styles.locationPrompt, styles.marginBottom]}>
      {/* <Icon
        name="search"
        style={[{ fontSize: 16, marginLeft: 10, marginTop: 5, color: 'lightgrey' }, styles.font]}
      /> */}
      <TextInput
        style={[styles.locationInput]}
        type="text"
        placeholder="Current Location"
        onSubmit={fetchRestaurants}
        onChangeText={onSearchInput}
      />
    </View>
  );
}

function SelectRestaurantButton({ fetchRestaurants }) {
  return (
    <Icon.Button
      borderRadius={50}
      size={24}
      style={styles.button}
      name="cutlery"
      color="black"
      backgroundColor="#BDEDE0"
      onPress={fetchRestaurants}
    >
    <TouchableHighlight onPress={fetchRestaurants}>
      <Text>SelectRestaurantButton</Text>
      {/* <DinDinText style={[{ textAlign: 'center', fontSize: 20, fontFamily: 'Helvetica Neue' }]}>
        Select Restaurant
      </DinDinText> */}
    </TouchableHighlight>
    </Icon.Button>
  );
}

class HomeScreen extends Component {
  state = {
    searchQuery: null,
    restaurants: null,
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'munchie',
    titleStyle: {
      fontFamily: 'Roboto-Medium',
    },
    // headerLeft: (
    //   <ShoutemIcon
    //     style={{ textAlign: 'left', color: 'white', position: 'absolute', left: 10 }}
    //     name="sidebar"
    //   />
    // ),
    headerStyle: {
      backgroundColor: '#EDC8FF',
    },
    headerTintColor: 'white',
  });

  onSearchInput = searchQuery => {
    console.log(searchQuery);
    this.setState(() => ({
      searchQuery,
    }));
  };

  fetchRestaurantsAPI(searchQuery) {
    return fetch(
      `${yelpAPIurls.search}?term=restaurant&location=${searchQuery}`,
      defaultConfig,
    ).then(response => response.json());
  }

  fetchRestaurantsMock() {
    return new Promise(resolve => {
      resolve(multipleBusinesses);
    });
  }

  fetchRestaurants = () => {
    const { navigation } = this.props;
    // const { searchQuery } = this.state;
    // navigation.navigate('Restaurant');
    console.log(this.state, 1);
    console.log(navigation);
    navigation.navigate('Restaurant');
    // this.fetchRestaurantsMock()
    //   .then(
    //     ({ businesses }) =>
    //       // const randomRestaurant = restaurants[5];
    //       // return fetch(`${yelpAPIurls.business}${randomRestaurant.id}`, defaultConfig);
    //       // want to do an additional search here for the image photos of this restaurant. maybe yelp graph ql better here
    //       singleBusiness,
    //   )
    //   .then(() => navigation.navigate('Restaurant'))
    //   .catch(err => console.log(err));
  };

  render() {
    console.log(navigator.geolocation);
    return (
      <LinearGradient
        colors={['#EDC8FF', '#EDC8FF', '#A1DDFD']}
        locations={[0, 0.15, 0.6]}
        end={{ x: 0.9, y: 1 }}
        start={{ x: 0.15, y: 0.3 }}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <PromptContainer>
            <Prompt />
            <Clever />
            <LocationPrompt
              searchRestaurants={this.fetchRestaurants}
              onSearchInput={this.onSearchInput}
            />
          </PromptContainer>
          <View style={styles.buttonContainer}>
            <SelectRestaurantButton fetchRestaurants={this.fetchRestaurants} />
          </View>
          {/* <Map /> */}
          {/* <TimeToRestaurant /> */}
        </View>
      </LinearGradient>
    );
  }
}

// TODO : figure out how to center button and text within button

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    // backgroundColor: 'pink',
    position: 'relative',
  },
  promptContainer: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  locationPrompt: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 30,
    borderRadius: 5,
  },
  locationInput: {
    height: 20,
    marginVertical: 5,
    // backgroundColor: 'red', // re-enable to see textBox inside textInput
    marginHorizontal: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 90,
    marginHorizontal: 30,
  },
  button: {
    flex: 1,
    width: 300,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  marginBottom: {
    marginBottom: 15,
  },
  font: {
    fontFamily: 'Helvetica Neue',
  },
});

export default HomeScreen;
