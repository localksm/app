import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, getSession } from '../apollo';
import Button from './Button';
import { validateFormDetails } from '../utils/validateDetails';

const SellButton = props => {
  const [session, setSession] = useState(null);
  const [sell] = useMutation(MUTATIONS.SELL);
  const [addPaymentMethods] = useMutation(
    MUTATIONS.INSERT_PROPOSAL_PAYMENT_METHOD,
  );
  const [load, setLoad] = useState(false);
  const { variables, paymentVars } = props;

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

    const variables = {};
    variables['makerId'] = session.id;
    variables['requestAsset'] = data.requestAsset;
    variables['offerAmount'] = parseFloat(offerAmount);
    variables['offerAsset'] = 'native';
    variables['requestAmount'] = parseFloat(requestAmount);
    variables['timestamp'] = date;
    variables['juryPool'] = '';
    variables['challengeStake'] = 0.001;
    variables['paymentMethod'] = data.paymentMethod;
    variables['localCurrency'] = data.requestAsset;

    return variables;
  };

  const sendSell = async () => {
    setLoad(true);
    const validation = validateForm(
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

   

    if (validation.isValid) {
      const resultValidator =validateFormDetails(
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
        setLoad(false);
        return Alert.alert(
          'Cannot contain empty fields',
          'Please enter the information requested in the form before continuing',
        );
      } else {
        try {
          setLoad(true);
          const send = mapData(variables, session);
          const { data } = await sell({ variables: send });
          const {id} = data.sell

          if (data.sell !== null) {
            const { data } = await addPaymentMethods({
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
              setLoad(false);
              Alert.alert(
                'Something went wrong!',
                'Failed to send payment details',
              );
            }
          } else {
            setLoad(false);
            Alert.alert(
              'Something went wrong!',
              'Failed to send data',
            );
          }
        } catch (error) {
          setLoad(false);
          Alert.alert('Warning', `Error: ${error}`);
          throw new Error(error);
        }
      }
    } else {
      setLoad(false);
      Alert.alert('Something went wrong!', validation.message);
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
    <Button label={props.label} sylect={props.style} action={sendSell} />
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

export default SellButton;