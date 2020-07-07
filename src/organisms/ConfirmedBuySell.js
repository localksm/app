import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { MultiView } from '../molecules';
import { Link, Button, ConfirmSentBuyButton } from '../atoms';

function mapPaymentMethod(method) {
  const methods = {
    VE: 'Venmo',
    ZE: 'Zelle',
    MP: 'Mercado Pago',
    WU: 'Western Union',
    MG: 'Money Gram',
    NE: 'Neteller',
    UP: 'Uphold',
    PP: 'Paypal',
    BN: 'Bank',
    OT: 'Other',
  };
  return methods[method];
}

const ConfirmedBuySell = props => {
  const [send, setSend] = useState(false);
  const [details, setDetails] = React.useState('');

  React.useEffect(() => {
    const str = string();
    setDetails(() => str);
  }, []);

  const {
    usernameTaker,
    requestAmount,
    offerAsset,
    offerAmount,
    paymentMethod,
    operationType,
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

 
  const title = `${usernameTaker} has accepted your offer `;
  const exchange = `Please send \n $ ${offerAmount} ${offerAsset}`;
  
  return (
    <View>
      <MultiView
        title={title}
        exchange={exchange}
        details={details}
        stylect={styles.container}>
        <View style={styles.textContainer}>
          {operationType === 'add_funds' || operationType === 'buy' ? (
            <Text style={styles.text}>You'll receive: {requestAmount} KSM</Text>
          ) : (
            <Text style={styles.text}>
              Please confirm that you receive the correct amount
            </Text>
          )}
        </View>
        {send ? (
          Alert.alert('Confirmed')
        ) : operationType === 'add_funds' || operationType === 'buy' ? (
          status === 'accepted' && (
            <ConfirmSentBuyButton
              variables={proposalId}
              label="Confirm received"
              actionConfirmSent={() => setSend(true)}
            />
          )
        ) : (
          <Button
            label="Confirm received"
            action={() => props.navigation.navigate('TransactionCompleted')}
          />
        )}

        <View style={styles.buttons}>
          <Link label="Report a problem" color="#cc5741" />
        </View>
      </MultiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default ConfirmedBuySell;
