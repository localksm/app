import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, getSession } from '../apollo';
import Button from './Button';

const AddFundsButton = props => {
  const [session, setSession] = useState(null);
  const [addfunds] = useMutation(MUTATIONS.ADD_FUNDS);
  const [load, setLoad] = useState(false);
  const { variables } = props;
  function validateForm(
    offerAmount,
    requestAmount,
    paymentMethod,
    requestAsset,
    country,
    other,
  ) {
    const offeredValidate = offerAmount > 0;
    const requiredValidate = requestAmount > 0;
    const paymentValidate = paymentMethod !== '';
    const currencyValidate = requestAsset !== '';
    const selectBank = paymentMethod === 'BN';
    const selectOther = paymentMethod === 'OT';
    const countryValidate = country !== '';
    const otherValidate = other !== '';
    const validation = {
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
        validation['message'] = !offeredValidate
          ? 'Offered currency cannot be empty'
          : !requiredValidate
          ? 'Required currency cannot be empty'
          : !paymentValidate
          ? 'Please select the payment method of your preference'
          : !currencyValidate
          ? 'Please select your local currency'
          : !countryValidate
          ? 'Please select a country'
          : '';

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
        validation['message'] = !offeredValidate
          ? 'Offered currency cannot be empty'
          : !requiredValidate
          ? 'Required currency cannot be empty'
          : !paymentValidate
          ? 'Please select the payment method of your preference'
          : !currencyValidate
          ? 'Please select your local currency'
          : !otherValidate
          ? 'The Other input cannot be empty'
          : '';

        return validation;
      }
    } else if (
      !offeredValidate ||
      !requiredValidate ||
      !paymentValidate ||
      !currencyValidate
    ) {
      validation['isValid'] = false;
      validation['message'] = !offeredValidate
        ? 'Offered currency cannot be empty'
        : !requiredValidate
        ? 'Required currency cannot be empty'
        : !paymentValidate
        ? 'Please select the payment method of your preference'
        : !currencyValidate
        ? 'Please select your local currency'
        : '';

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
    const makerSeller = 'makerSeller';

    const variables = {};
    variables['makerId'] = session.id;
    variables['offerAsset'] = 'native';
    variables['offerAmount'] = parseFloat(offerAmount);
    variables['requestAsset'] = data.requestAsset;
    variables['requestAmount'] = parseFloat(requestAmount);
    variables['timestamp'] = date;
    variables['juryPool'] = '';
    variables['challengeStake'] = 0.001;
    variables['paymentMethod'] = data.paymentMethod;
    variables['localCurrency'] = data.requestAsset;

    return variables;
  };

  const sendAddFunds = async () => {
    setLoad(true);
    const validation = validateForm(
      variables.offerAmount,
      variables.requestAmount,
      variables.paymentMethod,
      variables.requestAsset,
      variables.country,
      variables.other,
    );

    if (validation.isValid) {
      try {
        setLoad(true);
        const send = mapData(variables, session);
        await addfunds({ variables: send });
        props.actionAddFunds();
      } catch (error) {
        setLoad(false);
        Alert.alert('Warning', `Error: ${error}`);
        throw new Error(error);
      }
    } else {
      setLoad(false);
      Alert.alert('Something went wrong!', validation.message);
    }
  };

  useEffect(() => {
    set()
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
