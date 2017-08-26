/* eslint-disable class-methods-use-this */

import React from 'react';
import { View, Text } from 'react-native';
import pick from 'lodash/pick';
import get from 'lodash/get';

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
    const { restaurantPosition } = this.props;
    this.setState(() => ({ loading: true }));
    this.getTimeToRestaurant(restaurantPosition);
  }

  getTimeToRestaurant = (destination) => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.setState(
        () => ({ currentPosition: pick(coords, ['latitude', 'longitude']) }),
        async () => {
          console.log(this.state.currentPosition);
          const startLoc = this.stringifyCoordinates(this.state.currentPosition);
          const destinationLoc = '40.01823, -105.27705';
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
    // latitude, longitude
    return Object.keys(coordinates).sort().map(coordinate => coordinates[coordinate]).join(',');
  }

  prioritizeTransitTimes(distances) {
    const tenMinutes = 60 * 10;
    console.log(distances);
    const transitModesUI =
      distances.walking.seconds > tenMinutes ? distances : omit(distances, ['transit']);
    return Object.keys(transitModesUI).sort(
      (a, b) => (distances[a].seconds < distances[b].seconds ? -1 : 1),
    );
  }

  render() {
    // return <Geolocation enableHighAccuracy onSuccess={}/>;

    // const { enableHighAccuracy, timeout, maximumAge, onSuccess, onError } = this.props;

    return !this.state.loading
      ? <View>
        <Text>Transportation times</Text>
        <View style={{ flexDirection: 'row' }}>
          {this.prioritizeTransitTimes(this.state.distances).map(transitMode => [
            <Text>
              {labels[transitMode]}
            </Text>,
            <Text>
              {this.state.distances[transitMode].text}
            </Text>,
          ])}
        </View>
      </View>
      : null;
  }
}

export default TimeToRestaurant;
