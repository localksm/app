import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const Offer = props => {
  // console.log(props);
  
  return (
    
        <View style={styles.container}>
          <View style={styles.right}>
            <Image source={require('../../assets/add.png')} />
          </View>
          <View style={styles.center}>
          <Text style={{...styles.text}}>{props.payment}</Text>
            <Text style={{ ...styles.textSecond, fontSize: 14 }}>
              {props.usernameMaker}
            </Text>
            <Text style={styles.textSecond}>{`date UTC`}</Text>
          </View>
          <View style={styles.left}>
            <Text style={styles.textAmount}>0.00 KSM</Text>
            <Text style={styles.textAmountUSD}>$ 1 USD</Text>
            <Text style={styles.text_status}>Status</Text>
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 5,
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    borderBottomWidth: 0.35,
    borderBottomColor: '#b8b8b8',
    flex: 1,
    padding: 20,
  
  },
  right: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 3.7,
  },
  left: {
    flex: 1.5,
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 18,
    color: '#666666',
    fontFamily: 'Poppins-Medium',
  },
  textSecond: {
    fontSize: 12,
    padding: 1,
    color: '#b8b8b8',
    fontFamily: 'Poppins-Medium',
  },
  textAmount: {
    fontSize: 16,
    paddingLeft: 5,
    fontFamily: 'Poppins-Medium',
    color: '#666666',
    textAlign: 'left',
  },
    textAmountUSD: {
    fontSize: 12,
    paddingLeft: 5,
    fontFamily: 'Poppins-Medium',
    color: '#666666',
    textAlign: 'left',
  },
  text_status: {
    fontSize: 12,
    padding: 5,
    color: '#b8b8b8',
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
  },
});

export default Offer;
