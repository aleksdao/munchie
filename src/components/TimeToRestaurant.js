/* eslint-disable class-methods-use-this */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { Text } from './reusable/Text';
import pick from 'lodash/pick';
import get from 'lodash/get';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#A8A8A8',
  },
});

const labels = {
  walking: 'Walk',
  driving: 'Car',
  transit: 'Public Transit',
};

class TimeToRestaurant extends React.Component {
  state = {
    loading: null,
    currentPosition: null,
    distances: {
      walking: null,
      transit: null,
      driving: null,
    },
  };

  componentWillMount() {
    const { destinationCoordinates } = this.props;
    this.setState(() => ({ loading: true }));
    this.getTimeToRestaurant(destinationCoordinates);
  }

  getTimeToRestaurant = destination => {
    // const { coordinates: destinationCoo}
    console.log({ destination });
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.setState(
        () => ({ currentPosition: pick(coords, ['latitude', 'longitude']) }),
        async () => {
          console.log(this.state.currentPosition);
          const startLoc = this.stringifyCoordinates(this.state.currentPosition);
          const destinationLoc = this.stringifyCoordinates(destination);
          console.log({ startLoc, destinationLoc });
          this.createDirectionsRequests(startLoc, destinationLoc)
            .then(([driving, transit, walking]) =>
              Promise.all([driving.json(), transit.json(), walking.json()]),
            )
            .then(([...args]) =>
              args.map(transitMode => ({
                text: get(transitMode, 'routes.0.legs.0.duration.text'),
                seconds: get(transitMode, 'routes.0.legs.0.duration.value'),
              })),
            )
            .then(([driving, transit, walking]) => {
              this.setState(
                () => ({
                  distances: {
                    driving,
                    transit,
                    walking,
                  },
                }),
                () => this.setState(() => ({ loading: false })),
              );
            });
          // console.log('response', await resp.json());
        },
      );
    });
  };

  createDirectionsRequests(startLoc, destinationLoc) {
    const getDirectionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`;

    return Promise.all(
      Object.keys(this.state.distances)
        .sort()
        .map(mode => fetch(`${getDirectionsUrl}&mode=${mode}`)),
    );
  }

  stringifyCoordinates(coordinates) {
    return Object.keys(pick(coordinates, ['latitude', 'longitude']))
      .sort()
      .map(coordinate => coordinates[coordinate])
      .join(',');
  }

  prioritizeTransitTimes() {
    const { walking } = this.state.distances;
    const tenMinutes = 60 * 10;
    return walking > tenMinutes ? ['driving', 'walking', 'transit'] : ['driving', 'transit'];
  }

  render() {
    // return <Geolocation enableHighAccuracy onSuccess={}/>;

    // const { enableHighAccuracy, timeout, maximumAge, onSuccess, onError } = this.props;

    return !this.state.loading ? (
      <View>
        <Text style={styles.text}>Transportation times</Text>
        <View style={{ flexDirection: 'row' }}>
          {this.prioritizeTransitTimes().map(transitMode => [
            <Text style={[styles.text, { marginRight: 8 }]}>
              {labels[transitMode]}{' '}
              <Text style={{ color: 'black' }}>{this.state.distances[transitMode].text}</Text>
            </Text>,
            <Text style={[styles.text, { color: 'black', marginRight: 3 }]} />,
          ])}
        </View>
      </View>
    ) : null;
  }
}

export default TimeToRestaurant;
