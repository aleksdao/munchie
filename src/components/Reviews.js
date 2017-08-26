import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Reviews({ reviews }) {
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
        Reviews (303)
      </Text>
      <View style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'red' }}>
        {reviews.map((review, idx) =>
          (<View style={{ marginTop: 10 }}>
            {idx
              ? <View
                style={{
                  borderBottomWidth: 1,
                  marginBottom: 10,
                  marginHorizontal: 10,
                  borderBottomColor: '#D8D8D8',
                }}
              />
              : null}
            <Text style={{ color: '#A8A8A8' }}>
              {`"${review.text}"`}
            </Text>
          </View>),
        )}
      </View>
    </View>
  );
}

export default Reviews;
