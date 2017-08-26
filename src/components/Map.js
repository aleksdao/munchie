import React from 'react';
import MapView from 'react-native-maps';
import TimeToRestaurant from './TimeToRestaurant';

import singleBusiness from '../../mocks/singleBusiness.json';

class Map extends React.Component {
  render() {
    const { coordinates } = this.props;
    return (
      <MapView
        initialRegion={{
          ...coordinates,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0422,
        }}
      >
        <MapView.Marker coordinate={{ ...coordinates, title: singleBusiness.name }} />
      </MapView>
    );
  }
}

export default Map;
