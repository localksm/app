import React from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { UseSendWithdrawButton, Button } from '.';

const SendWithdrawButton = (props) => {
  const { load, sendWithdraw } = UseSendWithdrawButton(props);

  return !load ? (
    <View>
      <Button
        label={props.label}
        stylect={props.stylect}
        action={sendWithdraw}
      />
    </View>
  ) : (
    <View style={styles.text}>
      <ActivityIndicator size="small" color="white" />
      <Text style={styles.text}>Please wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    color: 'white',
  },
});

export default SendWithdrawButton;
