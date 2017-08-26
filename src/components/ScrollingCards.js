/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View } from 'react-native';
import PhotoViewer from './PhotoViewer';

class ScrollingCards extends React.Component {
  state = {
    openPhotoIndex: null,
  };

  openPhoto = (index) => {
    // debugger;
    this.setState(() => ({ openPhotoIndex: index }));
  };

  closePhoto = () => {
    this.setState(() => ({ openPhotoIndex: null }));
  };

  render() {
    const { renderContent, photos } = this.props;
    const { openPhotoIndex } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {renderContent({ openPhoto: this.openPhoto })}
        {openPhotoIndex !== null
          ? <PhotoViewer
            photos={photos}
            closePhoto={this.closePhoto}
            openPhotoIndex={openPhotoIndex}
          />
          : null}
      </View>
    );
  }
}

export default ScrollingCards;
