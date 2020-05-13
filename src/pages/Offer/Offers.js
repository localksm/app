import React from 'react';
import {View, StyleSheet} from 'react-native';
import {OfferList} from '../../organisms/Offer';

const  Offers = () => {
    return (
        <View style={styles.container}>
          <OfferList />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
  },
});

export default Offers;