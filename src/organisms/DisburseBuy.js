import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MultiView, FooterWhite } from '../molecules';
import { ScrollView } from 'react-native-gesture-handler';
import { Link, Button } from '../atoms';
import { demo } from '../utils/demoQuery';

const DisburseBuy = props => {
  const {
    usernameMaker,
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
  } = props.route.params.body.paymentData;

  const Name = `Name: ${name} `;
  const Lastname = `Lastname: ${lastName}`;
  const Email = `Email: ${email}`;
  const Phone = `Phone number: ${phone}`;
  const Address = `Address: ${address}`;
  const Acount = `Acount Number: ${accountNumber}`;
  const BankData = `Bank Information: ${bankData}`;
  const title = `${usernameMaker} has sent you`
  const exchange = `$ ${offerAmount} ${requestAsset}`;
  const details = `Payment method \n${mapPaymentMethod(
    paymentMethod,
  )} \nPayment details\n${Name}\n${Lastname}\n${Email}\n${Phone}\n${Address}\n${Acount}\n${BankData}`;
  
  return (
    <View>
      <ScrollView>
        <MultiView
          title={title}
          exchange={exchange}
          details={details}
          stylect={styles.container}
        />
      </ScrollView>
      <FooterWhite stylectContainer={styles.textContainer}>
        <Text style={styles.text}>
          Please confirm that you receive the correct amount
        </Text>

        <Button
          label="Confirm Sent"
          action={() => props.navigation.navigate('TransactionCompleted')}
        />
        <Link label="Report a problem" color="#cc5741" />
      </FooterWhite>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '15%',
  },
  textContainer: {
    paddingBottom: '70%',
    paddingHorizontal: '10%',
    height: '50%',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});

export default DisburseBuy;
