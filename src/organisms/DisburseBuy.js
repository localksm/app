import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MultiView, FooterWhite } from '../molecules';
import { ScrollView } from 'react-native-gesture-handler';
import { Link, Button } from '../atoms';
import { demo } from '../utils/demoQuery';

const DisburseBuy = props => {
  const title = `Please wait until ${demo.body.usernameMaker} sends you`;
  const amountKSM = '00.30 KSM';
  const exchange = `$ ${
    demo.body.offerAmount
  } in USD \n ${amountKSM} Local Currency`;
  const details = `Payment method \n ${
    demo.body.paymentMethod
  } \nPayment details\n ${demo.body.paymentData.name}\n ${
    demo.body.paymentData.lastName
  } \n ${demo.body.paymentData.country} \n ${demo.body.paymentData.email} \n ${
    demo.body.paymentData.address
  }`;
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
