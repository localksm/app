import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

function WithdrawText({ show, total, styles }) {
  return (
    <View style={styles.balance}>
      <Text style={styles.text}>Current Balance</Text>
      {!show ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={styles.text}>{total} KSM</Text>
      )}
    </View>
  );
}

export default WithdrawText;
