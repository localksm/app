import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, QUERIES, getSession } from '../apollo';
import Button from './Button';
import { getPin } from '../utils/JWT';

const SendDisbursementBuyer = (props) => {
  const [sendDisbursementBuyer] = useMutation(
    MUTATIONS.SEND_DISBURSEMENT_BUYER,
  );
  const [load, setLoad] = useState(false);
  const [id, setId] = useState(null);
  const { proposalId, takerId, operationType, disbursed } = props.variables;

  useEffect(() => {
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setId(session.id);
  }

  const confirmSent = async () => {
    setLoad(true);
    const pin = await getPin();
    let node;
    if (operationType === 'buy') {
      node = 'takerBuyer';
    } else {
      node = 'makerBuyer';
    }

    if (pin === null || pin === '') {
      props.showEnterPinScreen(true);
      return;
    }

    try {
      const response = await sendDisbursementBuyer({
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
      const { success } = response.data.sendDisbursementBuyer;
      if (success) {
        return props.actionConfirmSent();
      } else {
        setLoad(false);
        return Alert.alert('Warning', 'Something went wrong, contact support');
      }
    } catch (e) {
      setLoad(false);
      Alert.alert('Warning', 'Something went wrong, please contact support');
      throw new Error(e);
    }
  };

  return !load ? (
    !disbursed ? (
      <Button label={props.label} action={confirmSent} />
    ) : null
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

export default SendDisbursementBuyer;
