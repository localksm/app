import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, QUERIES, getSession } from '../apollo';
import Button from './Button';

const ConfirmSentBuyButton = props => {
  const [id, setId] = useState(null);

  useEffect(() => {
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setId(session.id);
  }

  const [confirmProposal] = useMutation(MUTATIONS.CONFIRM_PROPOSAL);
  const [load, setLoad] = useState(false);
  const proposalId = props.variables;

  const confirmSent = async () => {
    try {
      setLoad(true);
      await confirmProposal({
        variables: { proposalId: proposalId },
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
    } catch (error) {
      setLoad(false);
      Alert.alert('Confirmed');
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
