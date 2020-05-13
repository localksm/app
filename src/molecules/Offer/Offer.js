import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';


const Offer = (props) => {


  return (
    <View style={styles.container}>
      <View style={styles.right}>
        
      </View>
      <View style={styles.center}>
        <Text>payment</Text>
        <Text style={styles.textSecond}>countriy</Text>
        <Text style={[styles.textSecond, { fontSize: 14}]}>username Maker</Text>
        <Text style={{...styles.textSecond}}>{`date UTC`}</Text>
      </View>
      <View style={styles.left}>
        <Text style={styles.textAmount}>
          $ 1 USD
        </Text>
        <Text style={styles.text_status}>Status</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
   
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: 'white',
    resizeMode: 'contain',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
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
    padding: 5,
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
  text_status: {
    fontSize: 16,
    padding: 5,
    color: '#cc5741',
    textAlign: 'left',
  },
});

export default Offer;