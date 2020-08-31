import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import Button from './Button';
import { useSendDisbursementBuyer } from  '.'

function SendDisbursementBuyer(props) {

  const {disbursed, load, confirmSent} = useSendDisbursementBuyer(props)
 
  return !load ? (
    !disbursed ? (
      <Button label={props.label} testID="test-btn" action={confirmSent} />
    ) : null
  ) : (
    <View style={styles.text}>
      <ActivityIndicator size="small" color="black" />
      <Text style={styles.text}>Please wait...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
  },
});

export default SendDisbursementBuyer;
