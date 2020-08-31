import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import Button from './Button';
import { useSendDisbursementSeller } from '.';

const SendDisbursementSeller = (props) => {
  const { load, confirmSent } = useSendDisbursementSeller(props);

  return !load ? (
    <Button label={props.label} action={confirmSent} />
  ) : (
    <View style={styles.text}>
      <ActivityIndicator size="small" color="black" />
      <Text style={styles.text}>Please wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
  },
});

export default SendDisbursementSeller;
