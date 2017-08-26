import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';

function PhotoGallery1() {
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 18,
          marginVertical: 12,
          marginLeft: 15,
          color: '#A8A8A8',
          fontWeight: '500',
        }}
      >
        Photos (112)
      </Text>
      <View
        style={{
          marginHorizontal: 24,
          backgroundColor: 'white',
          flex: 1,
        }}
      >
        {[1, 2, 3].map(some =>
          (<View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}>
            {['red', 'grey', 'black'].map(something =>
              (<View
                style={{
                  flex: 1,
                  borderColor: 'yellow',
                  paddingHorizontal: 3,
                  paddingVertical: 3,
                }}
              >
                <TouchableWithoutFeedback>
                  <Image
                    source={{
                      uri: 'https://s3-media1.fl.yelpcdn.com/bphoto/K2XLjUg9hAktdOLMNSxAvQ/o.jpg',
                    }}
                    style={{
                      width: undefined,
                      height: undefined,
                      borderRadius: 3,
                      flex: 1,
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>),
            )}
          </View>),
        )}
      </View>
    </View>
  );
}

export default PhotoGallery1;
