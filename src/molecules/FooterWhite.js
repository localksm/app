import React from 'react';
import { View, StyleSheet } from 'react-native';


const FooterWhite = props => {  
  
  return (
    <View style={[styles.containerFee, props.stylectContainer]} >
      <View style={styles.feeContainer} />
       {props.children}
      
    </View>
  );
};
const styles = StyleSheet.create({
  containerFee: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    paddingTop: '10%',
    paddingBottom: '10%',
    backgroundColor: 'white',
    height: '30%',
    marginTop: 50, 
  },
  feeContainer: {
    marginTop: 0, 
    borderRadius: 10,
  },
  
});

export default FooterWhite;
