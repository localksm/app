import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, QUERIES } from '../apollo';
import Button from './Button';
import { setSessionId } from '../utils/hooks';

const ConfirmSentBuyButton = (props) => {
  const [id, setId] = useState(null);
  useEffect(() => {
    setSessionId(setId);
  }, []);

  const [confirmProposal] = useMutation(MUTATIONS.CONFIRM_PROPOSAL);
  const [load, setLoad] = useState(false);
  const { proposalId, usernameMaker } = props.variables;

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
      Alert.alert(
        'Confirimed proposal',
        `Please wait for ${usernameMaker} to respond`,
      )
    } catch (error) {
      setLoad(false);
      Alert.alert('Warning!', 'Unexpected error');
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
