import React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import TimeToRestaurant from './TimeToRestaurant';

import singleBusiness from '../../mocks/singleBusiness.json';

class Map extends React.Component {
  render() {
    const { coordinates } = this.props;
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingVertical: 12,
        }}
      >
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 18,
            color: '#A8A8A8',
            fontWeight: '500',
          }}
        >
          Map
        </Text>
        <View style={{flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              ...coordinates,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0422,
            }}
          >
            <MapView.Marker coordinate={{ ...coordinates, title: singleBusiness.name }} />
          </MapView>
        </View>
        <TimeToRestaurant />
      </View>
    );
  }
}

export default Map;
