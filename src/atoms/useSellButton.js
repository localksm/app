import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { validateFormDetails } from '../utils/validateDetails';
import { MUTATIONS } from '../apollo';
import {
  validateFormFund,
  mapDataSell,
  setSessionToState,
  getReciepientAddress,
} from '../utils/hooks';

const useSellButton = (props) => {
    const [session, setSession] = useState(null);
  const sell = useMutation(MUTATIONS.SELL);
  const addPaymentMethods = useMutation(
    MUTATIONS.INSERT_PROPOSAL_PAYMENT_METHOD,
  );
  
  const { variables, paymentVars } = props;

  const sendSell = async () => {
    props.setLoad(true);

    const validation = validateFormFund(
      variables.offerAmount,
      variables.requestAmount,
      variables.paymentMethod,
      variables.requestAsset,
      variables.country,
      variables.other,
    );

    const paymentMethod = variables.paymentMethod;
    const name = paymentVars.name;
    const lastName = paymentVars.lastName;
    const email = paymentVars.email;
    const address = paymentVars.address;
    const phone = paymentVars.phone;
    const bankData = paymentVars.bankData;
    const accountNumber = paymentVars.accountNumber;
    props.handlerError(validation);

    if (validation.isValid) {
      const resultValidator =  validateFormDetails(
        name,
        lastName,
        email,
        bankData,
        address,
        accountNumber,
        phone,
        paymentMethod,
      );      

      props.handlerError(resultValidator);
      if (!resultValidator.isValid) {
        props.setLoad(false);
        return Alert.alert(
          'Cannot contain empty fields',
          'Please enter the information requested in the form before continuing',
        );
      } else {
        try {
          props.setLoad(true);
          const send = mapDataSell(variables, session);
          // Get reciepient address
          const recipientAddress = getReciepientAddress();
          send['recipientAddress'] = recipientAddress;

          const { data } = await sell[0]({ variables: send });
          const { id } = data.sell;

          if (data.sell !== null) {
            const { data } = await addPaymentMethods[0]({
              variables: {
                userId: session.id,
                proposalId: id,
                name,
                email,
                lastName,
                address,
                phone,
                bankData,
                accountNumber,
                paymentMethod,
              },
            });
            if (data.addPaymentMethod.PaymentMethod !== null) {
              return props.actionSell();
            } else {
              props.setLoad(false);
              Alert.alert(
                'Something went wrong!',
                'Failed to send payment details',
              );
            }
          } else {
            props.setLoad(false);
            Alert.alert('Something went wrong!', 'Failed to send data');
          }
        } catch (error) {
          props.setLoad(false);
          Alert.alert('Warning', `Error: ${error}`);
          throw new Error(error);
        }
      }
    } else {
      props.setLoad(false);
      return Alert.alert(
        'Cannot contain empty fields',
        'Please enter the information requested in the form before continuing',
      );
    }
  };

  useEffect(() => {
    setSessionToState(setSession);
  }, []);

  return {sendSell}

};

export default useSellButton;