import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MultiView, FooterWhite } from '../molecules';
import { Link, Button } from '../atoms';

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

const AcceptedBuySell = props => {
  const {
    usernameMaker,
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
  } = props.route.params.body.paymentData;

  const Name = `Name: ${name} `;
  const Lastname = `Lastname: ${lastName}`;
  const Email = `Email: ${email}`;
  const Phone = `Phone number: ${phone}`;
  const Address = `Address: ${address}`;
  const Acount = `Acount Number: ${accountNumber}`;
  const BankData = `Bank Information: ${bankData}`;
  const title = `Please wait until ${usernameMaker} sends you`
  const exchange = `$ ${offerAmount} ${offerAsset}`;
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
        {operationType === 'withdraw_funds' && <Button label="Confirm sent" />}
        <View style={styles.buttons}>
          <Link
            label="Report a problem"
            color="#cc5741"
            action={() => props.navigation.navigate('ReportAProblem')}
          />
        </View>
      </MultiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  buttons: {
    alignItems: 'center',
  },
});

export default AcceptedBuySell;
