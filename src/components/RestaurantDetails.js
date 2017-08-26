/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
// import { View as ShoutemView } from '@shoutem/ui';
import AppText from './DinDinText';

import { convertMilitaryTime } from '../utils';

const styles = StyleSheet.create({
  restaurantDetail: {
    // marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // fontFamily: 'Roboto',
  },
  textStyle: { color: '#A8A8A8', fontSize: 17, fontFamily: 'Roboto-Light', fontWeight: '300' },
});

export function GreyText({ children, style }) {
  return (
    <AppText style={[styles.textStyle, style]}>
      {children}
    </AppText>
  );
}

export function OpeningHours(props) {
  console.log(props);
  const { restaurant: { hours }, style } = props;
  const { is_open_now: isOpenNow, open: openingHours } = hours[0];
  const today = openingHours.filter(hours => hours.day === 0);
  const hoursToday = today
    .map(hours => [convertMilitaryTime(hours.start), convertMilitaryTime(hours.end)].join(' - '))
    .join(', ');

  return (
    <View style={style}>
      {isOpenNow ? <GreyText>Open now </GreyText> : <GreyText>Closed</GreyText>}
      <GreyText>
        {hoursToday}
      </GreyText>
    </View>
  );
}

export function Description({ restaurant: { categories, price }, style }) {
  return (
    <View style={style}>
      <GreyText>
        {categories.slice(0, 2).map(category => category.title).join(', ')}
      </GreyText>
      <GreyText>
        {' \u2022 '}
      </GreyText>
      <GreyText>
        {price}
      </GreyText>
      <GreyText style={{ color: '#E1E1E1', fontWeight: '100' }}>
        {new Array(4 - price.length).fill('$').reduce((acc, next) => `${acc}${next}`, '')}
      </GreyText>
      <GreyText>
        {' \u2022 '}
      </GreyText>
      <GreyText>5 min walk</GreyText>
    </View>
  );
}

export function Address({ restaurant: { location: { formatted_address } }, style }) {
  return (
    <View style={[style, { marginBottom: 17 }]}>
      <GreyText style={{ color: 'black' }}>
        {formatted_address.split('\n').join(', ')}
      </GreyText>
    </View>
  );
}

export function Ratings({ style, restaurant: { rating } }) {
  return (
    <View style={[style, { justifyContent: 'space-between' }]}>
      <Rating name="Yelp" rating={rating} style={{ width: 155, height: 50 }} />
      <Rating name="Foursquare" rating={rating} style={{ width: 155, height: 50 }} />
    </View>
  );
}

export function Rating({ rating, style, name }) {
  const logoStyle =
    name === 'Yelp'
      ? {
          height: 50,
          width: 50,
        }
      : {
          height: 32,
          width: 32,
        };
  return (
    <View
      style={[
        {
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: '#F2F2F2',
          borderWidth: 1,
          flexDirection: 'row',
        },
        style,
      ]}
    >
      <Image
        style={[{ paddingVertical: 2, marginLeft: 10 }, logoStyle]}
        source={
          name === 'Yelp'
            ? require('../assets/Yelp_burst_positive_RGB.png')
            : require('../assets/foursquare_pink.png')
        }
      />
      <View style={{ marginRight: 20 }}>
        <GreyText style={{ fontSize: 20, color: 'black', alignSelf: 'flex-end' }}>
          {rating}/5
        </GreyText>
        <GreyText style={{ fontSize: 13, alignSelf: 'flex-end' }}>
          {name}
        </GreyText>
      </View>
    </View>
  );
}

function RestaurantDetails({ restaurant, children }) {
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

export default RestaurantDetails;
