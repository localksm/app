import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CardProposal, BalanceHeader } from '../molecules';

const OfferList = () => {
  return (
    <>
        <View style={styles.containerHeader}>
          <BalanceHeader />
        </View>
        <View style={styles.offerList}>
          <CardProposal />
        </View>      
    </>
  );
};
const styles = StyleSheet.create({
  containerHeader: {
    height: '14%'
  },
  textBalance: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  offerList: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,    
    paddingTop: '1%',    
    backgroundColor: 'white',
    overflow:'hidden',
    minHeight: '86%'    
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
