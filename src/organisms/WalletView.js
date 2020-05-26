/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WalletView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Address</Text>
      <View style={styles.image}>
          <Image  source={require('../../assets/qr4.png')} />
      </View>
      <Text style={styles.textKey}>GDLORFER7SGBXP3FBBSDR6SXD2ZN4EAYLQSKCX37GLM6AO4W5GT2R666</Text>
      <View style={styles.image}>
        <Text style={styles.textCopy}>Copy Address</Text>
      </View>


    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: '15%',
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  textKey: {
      paddingHorizontal: '10%',
      textAlign: 'center',
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  textCopy: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
   
  },
  image:{
    paddingTop: '10%',
    paddingBottom: '5%',
  },
});

export default WalletView;
