import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Link, ConfirmSentBuyButton, ConfirmReceivedButton } from '../atoms';
import { EnterPin, FormLayout } from '.';
import { client, QUERIES, getSession } from '../apollo';
import { getPin } from '../utils/JWT';
import { mapPaymentMethod } from '../utils/misc';

const ConfirmedBuySell = props => {
  const [send, setSend] = useState(false);
  const [details, setDetails] = React.useState('');
  const [verifyPin, setVeriFyPin] = useState(false);
  const [pin, setPin] = useState('');

  React.useEffect(() => {
    const str = string();
    setDetails(() => str);
    handleVerifyPin();
  }, []);

  const {
    usernameTaker,
    requestAmount,
    offerAsset,
    offerAmount,
    paymentMethod,
    operationType,
    takerId,
  } = props.route.params.body;

  const {
    accountNumber,
    address,
    bankData,
    email,
    lastName,
    name,
    phone,
    proposalId,
  } = props.route.params.body.paymentData;
  const { status } = props.route.params;
  const variables = {
    proposalId: proposalId,
    takerId: takerId,
    operationType: operationType,
    pin: pin,
  };

  const obj = {
    'Acount number': accountNumber,
    Address: address,
    'Bank Information': bankData,
    Email: email,
    'Last Name': lastName,
    Name: name,
    Phone: phone,
  };

  const string = () => {
    let str = `Payment method \n ${mapPaymentMethod(
      paymentMethod,
    )} \nPayment details \n`;
    Object.keys(obj).forEach(k => {
      if (obj[k] !== null && obj[k] !== '' && obj[k] !== undefined) {
        str = str + `${k}: ${obj[k]}\n`;
      }
    });
    return str;
  };

  const handleVerifyPin = async () => {
    const { session } = await getSession();
    const pin = await getPin();
    const response = await client.query({
      query: QUERIES.VERIFY_PIN,
      variables: { id: session.id, pin: pin },
    });
    const { isValid } = response.data.validatePin;
    if (isValid) {
      setPin(pin);
    }
    setVeriFyPin(!isValid);
  };

  const title = `${usernameTaker} has accepted your offer `;
  const exchange = `Please send \n $ ${offerAmount} ${offerAsset}`;

  return !verifyPin ? (
    <FormLayout.Content>
      <FormLayout.Body>
        <View style={styles.containerDetail}>
          <View style={styles.title}>
            <Text style={styles.textTitle}>{title}</Text>
          </View>
          <View style={styles.exchange}>
            <Text style={styles.textDetail}>{exchange}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.textDetail}>{details}</Text>
          </View>
        </View>
      </FormLayout.Body>
      <FormLayout.Footer>
        <View style={styles.footerContainer}>
          <View style={styles.textContainer}>
            {operationType === 'add_funds' || operationType === 'buy' ? (
              <Text style={styles.text}>
                You'll receive: {requestAmount} KSM
              </Text>
            ) : (
              <Text style={styles.text}>
                Please confirm that you receive the correct amount
              </Text>
            )}
          </View>
          {send
            ? Alert.alert('Confirmed')
            : operationType === 'add_funds' || operationType === 'buy'
            ? status === 'accepted' && (
                <ConfirmSentBuyButton
                  variables={proposalId}
                  label="Confirm received"
                  actionConfirmSent={() => setSend(true)}
                />
              )
            : status === 'confirmed' && (
                <ConfirmReceivedButton
                  variables={variables}
                  label="Confirm Received"
                  actionConfirmSent={() =>
                    props.navigation.navigate('TransactionCompleted', {
                      ...props.route.params,
                    })
                  }
                />
              )}
          <View style={styles.buttons}>
            <Link
              label="Report a problem"
              color="#cc5741"
              action={() =>
                props.navigation.navigate('ReportAProblem', {
                  ...props.route.params,
                })
              }
            />
          </View>
        </View>
      </FormLayout.Footer>
    </FormLayout.Content>
  ) : (
    <ScrollView>
      <EnterPin
        action={token => {
          setPin(token);
          setVeriFyPin(false);
        }}
        stylect={{
          marginTop: '10%',
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerDetail: {
    paddingTop: '0%',
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  buttons: {
    paddingTop: '3%',
    alignItems: 'center',
  },

  title: {
    alignItems: 'center',
    paddingTop: '5%',
    marginHorizontal: '10%',
    paddingBottom: ' 5%',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  textDetail: {
    textAlign: 'center',
    margin: '10%',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  exchange: {
    marginHorizontal: '10%',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderBottomColor: 'white',
  },
  details: {
    paddingHorizontal: '20%',
    paddingBottom: '0%',
  },
  footerContainer: {
    flex: 1,
    marginTop: '3%',
    marginHorizontal: '8%',
  },
});

export default ConfirmedBuySell;
