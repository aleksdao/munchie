/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react-native/no-inline-styles */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
} from 'react-native';
// import Emoji from 'react-native-emoji';
import { graphql, gql } from 'react-apollo';
// import Text from '../components/reusable/Text';
import RestaurantDetails, {
  OpeningHours,
  Description,
  Address,
  Ratings,
} from '../components/RestaurantDetails';
import PhotoGallery from '../components/PhotoGallery';
import ScrollingCards from '../components/ScrollingCards';
import ContentCard from '../components/ContentCard/ContentCard';
import Map from '../components/Map';
import PhotoGallery1 from '../components/PhotoGallery1';
import Reviews from '../components/Reviews';
import { colors } from '../constants';
import singleBusiness from '../../mocks/singleBusiness.json';
import businesses from '../../mocks/multipleBusinesses.json';
const { width, height } = Dimensions.get('window');

const { white, lightGrey } = colors;

const RestaurantListingQuery = gql`
  query restaurantSearch {
    search(location: "New York, NY", term: "fried chicken") {
      business {
        name
        id
        rating
        url
        price
        photos
        coordinates {
          latitude
          longitude
        }
        reviews {
          rating
          text
        }
        location {
          formatted_address
          address1
          address2
          address3
          city
          state
          zip_code
        }
        categories {
          title
        }
        hours {
          is_open_now
          open {
            day
            start
            end
          }
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    alignContent: 'center',
    position: 'relative',
    paddingHorizontal: 24,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    marginHorizontal: 3,
    borderWidth: 1,
    height: 70,
    borderRadius: 10,
    borderColor: lightGrey,
  },
  userOptions: {
    marginTop: 20,
    flexDirection: 'row',
  },
});

function UserOptions({ selections: userOptions }) {
  return (
    <View style={styles.userOptions}>
      {selections.map(({ selection, emoji }) => (
        <View style={styles.button}>
          <TouchableHighlight>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>
                <Emoji name={emoji} />
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 10 }}>{selection}</Text>
            </View>
          </TouchableHighlight>
        </View>
      ))}
    </View>
  );
}

class RestaurantListing extends Component {
  static navigationOptions = {
    title: 'Oak at Fourteenth',
    headerStyle: {
      backgroundColor: '#EDC8FF',
    },
    headerTintColor: 'white',
  };

  scroll = () => {
    this.scrollView._component.scrollTo();
  };

  onScroll = ({ nativeEvent }) => {
    // console.log(nativeEvent);
  };

  render() {
    const { navigation, data } = this.props;
    // const { loading, error, } = data;
    // if (loading || error) {
    //   return null;
    // }
    console.log(this.props);
    // const { reviews, photos, coordinates, name } = restaurant;
    console.log(JSON.parse(JSON.stringify(businesses)))
    // const restaurant = businesses[Math.floor(Math.random() * 20)];
    const restaurant = businesses[10];
    console.log({restaurant})
    const { reviews, photos, coordinates, name } = restaurant;

    return (
      <View style={{ flex: 1, position: 'relative', paddingBottom: 80, backgroundColor: 'white' }}>
        <ScrollView
          onScroll={this.onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.container}
          scrollEnabled
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
          ref={ref => (this.scrollView = ref)}
        >
          <RestaurantDetails restaurant={restaurant}>
            <OpeningHours />
            <Description />
            <Address />
            <Ratings />
          </RestaurantDetails>
          <View
            style={{
              flex: 1,
              borderColor: 'blue',
              borderWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                flex: 1,
                paddingVertical: 25,
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 1,
              }}
            >
              <View
                style={{
                  borderBottomWidth: 3,
                  borderBottomColor: '#17CAB1',
                  marginRight: 10,
                  paddingBottom: 2,
                }}
              >
                <Text
                  style={{
                    fontWeight: '400',
                    color: '#17CAB1',
                    fontSize: 15,
                  }}
                >
                  PHOTOS
                </Text>
              </View>

              <View
                style={{
                  marginRight: 10,
                  paddingBottom: 2,
                }}
              >
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 15,
                    color: '#A8A8A8',
                  }}
                >
                  REVIEWS
                </Text>
              </View>
              <View
                style={{
                  paddingBottom: 2,
                }}
              >
                <Text style={{ fontWeight: '400', fontSize: 15, color: '#A8A8A8' }}>MAP</Text>
              </View>
            </View>
          </View>
          <ContentCard ref={photoGallery => this.refs.photoGallery = photoGallery}>
            <PhotoGallery1 />
          </ContentCard>
          <ContentCard scrolling>
            <Reviews reviews={reviews} />
          </ContentCard>
          <ContentCard>
            <Map coordinates={coordinates} name={name} />
          </ContentCard>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            flex: 1,
            bottom: 0,
            height: 90,
            left: 0,
            right: 0,
          }}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 24,
              flexDirection: 'row',
              backgroundColor: 'white',
              paddingTop: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 13, color: '#A8A8A8', fontWeight: '500' }}>
                Do you like this recommendation?
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableWithoutFeedback>
                  <Image
                    source={require('../assets/10x_png.png')}
                    style={{ marginLeft: 10, width: 16, height: 19 }}
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <Image
                    source={require('../assets/10x_thumbs_down.png')}
                    style={{ marginLeft: 20, width: 16, height: 19 }}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', flex: 1, minHeight: 20, backgroundColor: 'white' }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E7E7E7',
                backgroundColor: 'white',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableHighlight>
                <Text style={{ fontSize: 18, color: '#17CAB1' }}>Let's go here!</Text>
              </TouchableHighlight>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E7E7E7',
                backgroundColor: 'white',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableHighlight>
                <Text style={{ fontSize: 18, color: '#17CAB1' }}>Choose another</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

// export default graphql(RestaurantListingQuery, {
//   options: ({ navigation: { state: { params: { restaurantQuery } } } }) => ({
//     variables: { restaurantQuery },
//   }),
// })(RestaurantListing);

export default RestaurantListing;

// {/* <ScrollingCards
//   photos={photos}
//   renderContent={({ openPhoto }) =>
//     (<View style={{ flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap' }}>
//       <ScrollView horizontal showsVerticalScrollIndicator={false} pagingEnabled>
//         <View style={{ width, alignItems: 'center' }}>
//           <PhotoGallery photosURIs={photos} onPhotoPress={openPhoto} />
//         </View>
//         <View style={{ width, alignItems: 'center' }}>
//           <PhotoGallery photosURIs={photos} onPhotoPress={openPhoto} />
//         </View>
//       </ScrollView>
//     </View>)
//   }
// /> */}
