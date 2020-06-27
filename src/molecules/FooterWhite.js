import React from 'react';
import { View, StyleSheet } from 'react-native';


const FooterWhite = props => {  
  
  return (
    <View style={[styles.containerFee, props.stylectContainer]} >
      {/* <View style={styles.feeContainer} /> */}
       {props.children}
      
    </View>
  );
};
const styles = StyleSheet.create({
  containerFee: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '40%',
  },
  // feeContainer: {
  //   marginTop: 0, 
  //   borderRadius: 10,
  // },
  
});

export default FooterWhite;
