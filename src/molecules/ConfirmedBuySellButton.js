import React from 'react';
import { Alert } from 'react-native';
import { ConfirmSentBuyButton, ConfirmReceivedButton } from '../atoms';

function ConfirmedBuySellButton({
  send,
  status,
  operationType,
  setSend,
  variables,
  navigation,
  params,
}) {
  if (send) {
    return Alert.alert('Confirmed');
  }

  return operationType === 'add_funds' || operationType === 'buy'
    ? status === 'accepted' && (
        <ConfirmSentBuyButton
          variables={variables}
          label="Confirm received"
          navigation={navigation}
          params={params}
        />
      )
    : status === 'confirmed' && (
        <ConfirmReceivedButton
          variables={variables}
          label="Confirm Received"
          navigation={navigation}
          params={params}
        />
      );
}

export default ConfirmedBuySellButton;
