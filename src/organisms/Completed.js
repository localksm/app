import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { CompletedMultiView } from '../molecules';
import { Button } from '../atoms';

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

const Completed = props => {
  const navigation = useNavigation()

  const {
    requestAsset,
    requestAmount,
    offerAmount,
    paymentMethod,
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
  const title = `You received: ${requestAmount} KSM`
  const exchange = `$ ${offerAmount} ${requestAsset}`;
  const details = `Payment method \n${mapPaymentMethod(
    paymentMethod,
  )} \nPayment details\n${Name}\n${Lastname}\n${Email}\n${Phone}\n${Address}\n${Acount}\n${BankData}`;
  
  return (
    <View>
      <CompletedMultiView
        title={title}
        exchange={exchange}
        details={details}
        stylect={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
              
            {/* here the information of the FEE will be placed */}
          </Text>
        </View>
        <Button label="Ok" action={() => navigation.navigate('Offers')} />
      </CompletedMultiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '1%',
  },
  textContainer: {
    alignItems: 'center',
    paddingBottom: '5%',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Completed;