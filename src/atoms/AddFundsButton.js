import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, getSession, QUERIES, client } from '../apollo';
import Button from './Button';
import { getPin } from '../utils/JWT';

const AddFundsButton = props => {
  const [session, setSession] = useState(null);
  const [addfunds] = useMutation(MUTATIONS.ADD_FUNDS);
  const [load, setLoad] = useState(false);
  const { variables } = props;
  function validateForm(
    offerAmount,
    requestAmount,
    paymentMethod,
    offerAsset,
    country,
    other,
  ) {
    const offeredValidate = offerAmount > 0;
    const requiredValidate = requestAmount > 0;
    const paymentValidate = paymentMethod !== '' && paymentMethod !== null;
    const currencyValidate = offerAsset !== '' && offerAsset !== null;
    const selectBank = paymentMethod === 'BN';
    const selectOther = paymentMethod === 'OT';
    const countryValidate = country !== '';
    const otherValidate = other !== '';
    const validation = {
      currency: {
        isInvalid: false,
        message: '',
      },
      requiredCurrency: {
        isInvalid: false,
        message: '',
      },
      paymentMethod: {
        isInvalid: false,
        message: '',
      },
      localCurrency: {
        isInvalid: false,
        message: '',
      },
      other: {
        isInvalid: false,
        message: '',
      },
      country: {
        isInvalid: false,
        message: '',
      },
      isValid: false,
      message: '',
    };
    if (selectBank) {
      if (
        !offeredValidate ||
        !requiredValidate ||
        !paymentValidate ||
        !currencyValidate ||
        !countryValidate
      ) {
        validation['isValid'] = false;
        validation['currency']['isInvalid'] = !offeredValidate;
        validation['currency']['message'] = 'Offered currency cannot be empty';
        validation['requiredCurrency']['isInvalid'] = !requiredValidate;
        validation['requiredCurrency']['message'] =
          'Required currency cannot be empty';
        validation['paymentMethod']['isInvalid'] = !paymentValidate;
        validation['paymentMethod']['message'] =
          'Please select the payment method of your preference';
        validation['localCurrency']['isInvalid'] = !currencyValidate;
        validation['localCurrency']['message'] =
          'Please select your local currency';
        validation['country']['isInvalid'] = !countryValidate;
        validation['country']['message'] = 'Please select a country';

        return validation;
      }
    } else if (selectOther) {
      if (
        !offeredValidate ||
        !requiredValidate ||
        !paymentValidate ||
        !currencyValidate ||
        !otherValidate
      ) {
        validation['isValid'] = false;
        validation['currency']['isInvalid'] = !offeredValidate;
        validation['currency']['message'] = 'Offered currency cannot be empty';
        validation['requiredCurrency']['isInvalid'] = !requiredValidate;
        validation['requiredCurrency']['message'] =
          'Required currency cannot be empty';
        validation['paymentMethod']['isInvalid'] = !paymentValidate;
        validation['paymentMethod']['message'] =
          'Please select the payment method of your preference';
        validation['localCurrency']['isInvalid'] = !currencyValidate;
        validation['localCurrency']['message'] =
          'Please select your local currency';
        validation['other']['isInvalid'] = !otherValidate;
        validation['other']['message'] = 'The Other input cannot be empty';

        return validation;
      }
    } else if (
      !offeredValidate ||
      !requiredValidate ||
      !paymentValidate ||
      !currencyValidate
    ) {
      validation['isValid'] = false;
      validation['currency']['isInvalid'] = !offeredValidate;
      validation['currency']['message'] = 'Offered currency cannot be empty';
      validation['requiredCurrency']['isInvalid'] = !requiredValidate;
      validation['requiredCurrency']['message'] =
        'Required currency cannot be empty';
      validation['paymentMethod']['isInvalid'] = !paymentValidate;
      validation['paymentMethod']['message'] =
        'Please select the payment method of your preference';
      validation['localCurrency']['isInvalid'] = !currencyValidate;
      validation['localCurrency']['message'] =
        'Please select your local currency';

      return validation;
    } else {
      validation['isValid'] = true;
      return validation;
    }
  }

  const mapData = (data, session) => {
    const time = Date.now();
    const date = new Date(time);
    const offerAmount = data.offerAmount;
    const requestAmount = data.requestAmount;

    const variables = {};
    variables['makerId'] = session.id;
    variables['requestAsset'] = 'native';
    variables['offerAmount'] = parseFloat(offerAmount);
    variables['offerAsset'] = data.offerAsset;
    variables['requestAmount'] = parseFloat(requestAmount);
    variables['timestamp'] = date;
    variables['juryPool'] = '';
    variables['challengeStake'] = 0.001;
    variables['paymentMethod'] = data.paymentMethod;
    variables['localCurrency'] = data.offerAsset;

    return variables;
  };

  const sendAddFunds = async () => {
    setLoad(true);
    const validation = validateForm(
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
        const send = mapData(variables, session);

        // Get reciepient address
        const pin = await getPin();
        const recipientData = await client.query({
          query: QUERIES.PUBLIC_KEY,
          variables: {
            id: session.id,
            pin,
          },
        });
        const recipientAddress = recipientData.data.publicKeys.ksm;

        send['recipientAddress'] = recipientAddress;

        await addfunds({ variables: send });
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
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setSession(session);
  }

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
