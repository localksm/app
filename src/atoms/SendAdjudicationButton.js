import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS } from '../apollo';
import Button from './Button';
import { setSessionId } from '../utils/hooks';

const SendAdjudicationButton = (props) => {
  const sendAdjudication = useMutation(MUTATIONS.SEND_ADJUDICATION);
  const [load, setLoad] = useState(false);
  const [id, setId] = useState(null);
  const { proposalId, galleryImages, description } = props.variables;

  useEffect(() => {
    setSessionId(setId);
  }, []);

  const send = async () => {
    try {
      setLoad(true);
      if (description === '') {
        return Alert.alert('Warning!', 'Please, describe your problem');
      }
      if (galleryImages === []) {
        return Alert.alert('Warning!', 'Please upload an evidence image');
      }

      await sendAdjudication[0]({
        variables: {
          proposalId: proposalId,
          images: galleryImages,
          createdBy: id,
          comment: description,
        },
      });
      props.actionMediation();
    } catch (error) {
      setLoad(false);
      Alert.alert('Warning', 'Something went wrong, please contact support');
      throw new Error(error);
    }
  };

  return !load ? (
    <Button  label={props.label} action={send} />
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

export default SendAdjudicationButton;
