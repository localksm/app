import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { Offer } from '../../molecules/Offer';
import { HomeLayout } from '../index';

const OfferList = () => {
  return (
    <SafeAreaView>
      <HomeLayout>
        <View style={styles.container}>
          <Text style={{ ...styles.textBalance, paddingBottom: '5%' }}>
            Balance
          </Text>
          <Text style={{ ...styles.textBalance, fontSize: 20 }}>
            1,2345.00 KSM
          </Text>
          <Text style={{ ...styles.textBalance, fontSize: 16 }}>
            {' '}
            $1,2345.00 USD
          </Text>
        </View>
        <Offer />
      </HomeLayout>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: '10%',
  },
  textBalance: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OfferList;
