import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  reviewsContent: { backgroundColor: 'white', borderWidth: 1 },
  divider: { marginTop: 10 },
  headerText: {
    backgroundColor: 'transparent',
    fontSize: 18,
    color: '#A8A8A8',
    fontWeight: '500',
  },
  reviewDivider: {
    borderBottomWidth: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    borderBottomColor: '#D8D8D8',
  },
  scrollContainer: {
    borderColor: 'red',
    borderWidth: 1
  },
});

function Reviews({ reviews }) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1,
      }}
    >
      <Text style={styles.headerText}>Reviews (303)</Text>
      <View style={styles.divider} />
      <ScrollView style={reviews.scrollContainer} contentContainerStyle={styles.reviewsContent}>
        {reviews.map((review, idx) => (
          <View style={{ marginBottom: 10 }}>
            {idx ? <View style={styles.reviewDivider} /> : null}
            <Text style={{ color: '#A8A8A8' }}>{`"${review.text}"`}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default Reviews;
