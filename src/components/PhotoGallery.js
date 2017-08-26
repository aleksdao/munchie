/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { GreyText } from './RestaurantDetails';
import { colors } from '../constants';
import PhotoViewer from './PhotoViewer';

const { white, black } = colors;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: white,
    shadowColor: black,
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    borderRadius: 3,
    shadowOpacity: 0.3,
    width: 280,
  },
  photosHeader: {
    marginBottom: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

class PhotoGallery extends React.Component {
  state = {
    openPhotoIndex: null,
  };

  render() {
    const { photosURIs, onPhotoPress } = this.props;
    const { openPhotoIndex } = this.state;
    const photos = [...photosURIs, ...photosURIs, ...photosURIs];
    return (
      <View style={styles.container}>
        <View style={styles.photosHeader}>
          <GreyText style={{ fontSize: 14 }}>Photos (100)</GreyText>
        </View>

        <View style={{ justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
          {photos.map((uri, index) =>
            (<TouchableWithoutFeedback onPress={() => onPhotoPress(index)}>
              <Image source={{ uri }} style={{ width: 75, height: 75, margin: 5 }} />
            </TouchableWithoutFeedback>),
          )}
        </View>
      </View>
    );
  }
}

PhotoGallery.propTypes = {
  photosURIs: PropTypes.arrayOf(PropTypes.string),
};

PhotoGallery.defaultProps = {
  photosURIs: [],
};

export default PhotoGallery;
