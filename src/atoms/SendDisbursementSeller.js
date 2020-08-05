import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, QUERIES, getSession } from '../apollo';
import Button from './Button';
import { getPin } from '../utils/JWT';

const SendDisbursementSeller = (props) => {
  const [sendDisbursementSeller] = useMutation(
    MUTATIONS.SEND_DISBURSEMENT_SELLER,
  );
  const [load, setLoad] = useState(false);
  const [id, setId] = useState(null);
  const {
    proposalId,
    takerId,
    operationType,
    pin,
    disbursed,
  } = props.variables;

  useEffect(() => {
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setId(session.id);
  }

  const confirmSent = async () => {
    const pin = await getPin()
    let node;
    if (operationType === 'buy') {
      node = 'makerSeller';
    } else {
      node = 'takerSeller';
    }

    if (pin === null || pin === '') {
      props.showEnterPinScreen(true);
      return;
    }

    try {
      setLoad(true);
      await sendDisbursementSeller({
        variables: {
          proposalId: proposalId,
          takerId: takerId,
          node,
          pin,
        },
        refetchQueries: [
          {
            query: QUERIES.QUERY_PROPOSALS,
            variables: { userId: id, offset: 0, limit: 100 },
          },
          {
            query: QUERIES.QUERY_USER_PROPOSALS,
            variables: { id: id, offset: 0, limit: 100 },
          },
        ],
      });
      return props.actionConfirmSent();
    } catch (e) {
      setLoad(false);
      Alert.alert('Warning', 'Something went wrong, please contact support');
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

export default SendDisbursementSeller;
