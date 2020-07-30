import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, QUERIES, getSession } from '../apollo';
import Button from './Button';
import { getPin } from '../utils/JWT';

const ConfirmReceivedButton = props => {
  const [sendDisbursementBuyer] = useMutation(
    MUTATIONS.SEND_DISBURSEMENT_BUYER,
  );
  const [sendDisbursementSeller] = useMutation(
    MUTATIONS.SEND_DISBURSEMENT_SELLER,
  );
  const [load, setLoad] = useState(false);
  const [id, setId] = useState(null);
  const { proposalId, takerId, operationType, pin } = props.variables;

  useEffect(() => {
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setId(session.id);
  }

  const confirmSent = async () => {
    try {
      setLoad(true);
      if (operationType === 'sell' || operationType === 'withdraw_funds') {
        const response = await sendDisbursementBuyer({
          variables: {
            proposalId: proposalId,
            takerId: takerId,
            node: 'makerBuyer',
            pin: pin
          },
        });
        const { success } = response.data.sendDisbursementBuyer;
        if (success) {
          setLoad(true);
          await sendDisbursementSeller({
            variables: {
              proposalId: proposalId,
              takerId: takerId,
              node: 'takerSeller',
              pin: pin
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
        } else {
          setLoad(false);
          return Alert.alert(
            'Warning',
            'Something went wrong, contact support',
          );
        }
      } else {
        // Buy
        const pin = await getPin();

        if (pin === null || pin === '') {
          props.showEnterPinScreen(true);
          return;
        }

        const response = await sendDisbursementBuyer({
          variables: {
            proposalId: proposalId,
            takerId: takerId,
            pin,
            node: 'takerBuyer',
            pin: pin
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
          setLoad(true);
          return props.actionConfirmSent();
        } else {
          setLoad(false);
          return Alert.alert(
            'Warning',
            'Something went wrong, contact support',
          );
        }
      }
    } catch (error) {
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

export default ConfirmReceivedButton;
