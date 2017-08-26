/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-use-before-define */

import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { colors } from '../constants';

const { black } = colors;

const { width, height } = Dimensions.get('window');

function PhotoViewer({ photos }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={({ item }) =>
          (<View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item }} />
          </View>)}
        pagingEnabled
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -120,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 250,
    height: 250,
  },
});

export default PhotoViewer;
