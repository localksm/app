import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, getSession } from '../apollo';
import Button from './Button';

const AddFundsButton = props => {
  const [session, setSession] = useState(null);
  const [addfunds] = useMutation(MUTATIONS.ADD_FUNDS);
  const { variables } = props;
  function validateForm(
    offered,
    required,
    paymentMethods,
    currency,
    country,
    other,
  ) {
    const offeredValidate = offered > 0;
    const requiredValidate = required > 0;
    const paymentValidate = paymentMethods !== '';
    const currencyValidate = currency !== '';
    const selectBank = paymentMethods === 'BN';
    const selectOther = paymentMethods === 'OT';
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
    const offerAmount = data.offered;
    const requestAmount = data.required;
    const makerSeller = 'makerSeller';

    const variables = {};
    variables['makerId'] = session.id;
    variables['offerAsset'] = 'native';
    variables['offerAmount'] = parseFloat(offerAmount);
    variables['requestAsset'] = data.currency;
    variables['requestAmount'] = parseFloat(requestAmount);
    variables['timestamp'] = date;
    variables['juryPool'] = '';
    variables['challengeStake'] = 0.1;
    variables['paymentMethod'] = data.paymentMethods;
    variables['localCurrency'] = data.currency;
    variables['node'] = makerSeller.replace(/["']/g, '');

    return variables;
  };

  const sendAddFunds = async () => {
    const validation = validateForm(
      variables.offered,
      variables.required,
      variables.paymentMethods,
      variables.currency,
      variables.country,
      variables.other,
    );

    if (validation.isValid) {
      try {
        const send = mapData(variables, session);
        await addfunds({ variables: send });
        props.actionAddFunds();
      } catch (error) {
        throw new Error(error);
      }
    } else {
      Alert.alert('Something went wrong!', validation.message);
    }
  };

  useEffect(async () => {
    const { session } = await getSession();
    setSession(session);
  }, []);

  return (
    <Button label={props.label} sylect={props.style} action={sendAddFunds} />
  );
};

export default AddFundsButton;
