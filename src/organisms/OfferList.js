import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CardProposal, BalanceHeader } from '../molecules';

const OfferList = () => {
  return (
    <View>
      <BalanceHeader />
      <ScrollView>
        <View style={styles.offerList}>
          <CardProposal />
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
    paddingBottom: '80%',
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
