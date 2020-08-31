import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, QUERIES, client } from '../apollo';
import Button from './Button';
import {
  setSessionToState,
  validateFormFund,
  mapDataAddFund,
  setStateRecipientAddress
} from '../utils/hooks';

const AddFundsButton = (props) => {
  const [session, setSession] = useState(null);
  const addfunds = useMutation(MUTATIONS.ADD_FUNDS);
  const [load, setLoad] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const { variables } = props;

  const sendAddFunds = async () => {
    setLoad(true);    
    const validation = validateFormFund(
      variables.offerAmount,
      variables.requestAmount,
      variables.paymentMethod,
      variables.offerAsset,
      variables.country,
      variables.other,
    );

    props.handlerError(validation);

    if (validation.isValid) {
      try {
        setLoad(true);
        const send = mapDataAddFund(variables, session, recipientAddress);        
        await addfunds[0]({ variables: send });
        props.actionAddFunds();
      } catch (error) {
        setLoad(false);
        Alert.alert('Warning', `Error: ${error}`);
        throw new Error(error);
      }
    } else {
      setLoad(false);
      return Alert.alert(
        'Cannot contain empty fields',
        'Please enter the information requested in the form before continuing',
      );
    }
  };

  useEffect(() => {
    setSessionToState(setSession);    
    setStateRecipientAddress(setRecipientAddress);
  }, []);

  return !load ? (
    <Button label={props.label} sylect={props.style} action={sendAddFunds} />
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

export default AddFundsButton;
