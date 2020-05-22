import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Offer } from '../molecules';

const OfferList = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={{ ...styles.textBalance, paddingBottom: '5%' }}>
          Balance
        </Text>
        <Text style={{ ...styles.textBalance, fontSize: 20 }}>
          1,245.00 KSM
        </Text>
        <Text style={{ ...styles.textBalance, fontSize: 14 }}>
          {' '}
          $7,804.40 USD
        </Text>
      </View>
      <ScrollView>
        <View style={styles.offerList}>
          <Offer />
        </View>
      </ScrollView>
    </View>
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
    fontFamily: 'Poppins-Medium',
  },
  offerList: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    paddingTop: '1%',
    paddingBottom: '10%',
    backgroundColor: 'white',
  },
  offerList: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    paddingTop: '1%',
    paddingBottom: '10%',
    backgroundColor: 'white',
  },
});

export default OfferList;
