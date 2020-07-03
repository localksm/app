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

  const {
    usernameTaker,
    requestAmount,
    requestAsset,
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

  const Name = `Name: ${name} `;
  const Lastname = `Lastname: ${lastName}`;
  const Email = `Email: ${email}`;
  const Phone = `Phone number: ${phone}`;
  const Address = `Address: ${address}`;
  const Acount = `Acount Number: ${accountNumber}`;
  const BankData = `Bank Information: ${bankData}`;
  const title = `${usernameTaker} has accepted your offer `;
  const exchange = `Please send \n $ ${offerAmount} ${requestAsset}`;
  const details = `Payment method \n${mapPaymentMethod(
    paymentMethod,
  )} \nPayment details\n${Name}\n${Lastname}\n${Email}\n${Phone}\n${Address}\n${Acount}\n${BankData}`;
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
              label="Confirm Sent"
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
    paddingTop: '10%',
  },
  textContainer: {
    alignItems: 'center',
    paddingBottom: '5%',
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
