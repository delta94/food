import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Business} from '../../../store/businesses/types';

interface BusinessListItem {
  business: Business;
}

const BusinessListItem = ({business}: BusinessListItem) => {
  return (
    <View style={styles.listItemContainer}>
      <Image style={styles.image} source={{uri: business.image_url}} />
      <Text style={styles.businessName}>{business.name}</Text>
      <View style={styles.businessInfoContainer}>
        <View style={styles.businessInfo}>
          <AntDesign name="star" size={16} color="black" style={styles.starIcon} />
          <Text>{business.rating} Stars</Text>
        </View>
        <View style={styles.businessInfoReviews}>
          <AntDesign name="eye" size={16} color="black" style={styles.reviewIcon} />
          <Text>{business.review_count} Reviews</Text>
        </View>
      </View>
    </View>
  );
};

export default BusinessListItem;

const styles = StyleSheet.create({
  listItemContainer: {
    marginLeft: 15
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5
  },
  businessName: {
    fontWeight: 'bold',
    marginBottom: 2
  },
  businessInfoContainer: {
    flexDirection: 'row',
  },
  businessInfo: {
    flexDirection: 'row'
  },
  businessInfoReviews: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  reviewIcon: {
    alignSelf: 'center'
  },
  starIcon: {
    alignSelf: 'center'
  }
});
