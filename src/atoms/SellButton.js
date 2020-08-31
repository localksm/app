import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { withContext } from '../apollo';
import Button from './Button';
import { useSellButton } from '.';

const SellButton = (props) => {
  const { sendSell } = useSellButton(props);

  return !props.load ? (
    <Button label={props.label} sylect={props.style} action={sendSell} />
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

export default withContext(SellButton);
