import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Card({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 325,
    height: 325,
    backgroundColor: 'white',
    marginVertical: 20,
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
  },
});

export default Card;
