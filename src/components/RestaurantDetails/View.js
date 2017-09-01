import React from 'react';
import { View } from 'react-native';

function View({ restaurant, children }) {
  return (
    <View>
      {children.map(child =>
        React.cloneElement(child, {
          restaurant,
          style: styles.restaurantDetail,
        }),
      )}
    </View>
  );
}

export default View;
