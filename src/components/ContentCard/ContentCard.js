import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

class Card extends React.Component {
  render() {
    const { children, scrolling } = this.props;
    return (
      <View style={styles.shadowContainer}>
        <View style={styles.nonScrollContainer}>{children}</View>
      </View>
    );
  }
}

// function Card({ children, scrolling }) {
//   return (
//     <View style={styles.shadowContainer}>
//       <View style={styles.nonScrollContainer}>{children}</View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  shadowContainer: {
    width: 325,
    height: 325,
    backgroundColor: 'white',
    marginVertical: 20,
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    paddingBottom: 10,
  },
  nonScrollContainer: {
    flex: 1,
    // width: 325,
    // minHeight: 325,
    // maxHeight: 325,
    // marginBottom: 10,
    // overflow: 'scroll',
  },
});

export default Card;
