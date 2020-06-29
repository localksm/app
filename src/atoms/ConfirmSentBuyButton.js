import React, { useState } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS } from '../apollo';
import Button from './Button';

const ConfirmSentBuyButton = props => {

  const [confirmProposal] = useMutation(MUTATIONS.CONFIRM_PROPOSAL);
  const [load, setLoad] = useState(false);
  const proposalId = props.variables

  const confirmSent = async () => {
    try {
      setLoad(true);
      await confirmProposal({variables: {proposalId:proposalId}})
      return props.actionConfirmSent();
    } catch (error) {
      setLoad(false);
      Alert.alert('Warning', `Error: ${error}`);
      throw new Error(error);
    }
  };
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

export default ConfirmSentBuyButton;