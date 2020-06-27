import React from 'react';
import { View, StyleSheet } from 'react-native';

const FooterWhite = props => {
  return (
    <View style={[styles.containerFee, props.stylectContainer]}>
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
});

export default FooterWhite;
