import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, getSession, client, QUERIES, withContext } from '../apollo';
import Button from './Button';
import { validateFormDetails } from '../utils/validateDetails';
import { getPin } from '../utils/JWT';
import { fetchBalacnce } from '../utils/ksm';

const SellButton = (props) => {
  const [session, setSession] = useState(null);
  const sell = useMutation(MUTATIONS.SELL);
  const addPaymentMethods = useMutation(
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
    const paymentValidate = paymentMethod !== '' && paymentMethod !== null;
    const currencyValidate = requestAsset !== '' && requestAsset !== null;
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
    await fetchBalacnce();
    const balance = await props.state.getData('GET_BALANCE_KSM');
    const { total } = JSON.parse(balance.polkadot.balanceKSM);

    if (variables.offerAmount > total) {
      setLoad(false);
      return Alert.alert('', 'Insufficient balance');
    }

    const validation = await validateForm(
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
      const resultValidator = validateFormDetails(
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
              setLoad(false);
              Alert.alert(
                'Something went wrong!',
                'Failed to send payment details',
              );
            }
          } else {
            setLoad(false);
            Alert.alert('Something went wrong!', 'Failed to send data');
          }
        } catch (error) {
          setLoad(false);
          Alert.alert('Warning', `Error: ${error}`);
          throw new Error(error);
        }
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

export default withContext(SellButton);
