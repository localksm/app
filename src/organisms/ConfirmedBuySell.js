import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MultiView } from '../molecules';
import { Link, Button } from '../atoms';
import { demo } from '../utils/demoQuery';

const ConfirmedBuySell = props => {
  const title = `Please wait until ${demo.body.usernameMaker} sends you`;
   const amountKSM = '00.30 KSM'
   const exchange = `$ ${demo.body.offerAmount} in USD \n ${amountKSM} Local Currency`;
   const details = `Payment method \n ${demo.body.paymentMethod} \nPayment details\n ${demo.body.paymentData.name}\n ${demo.body.paymentData.lastName} \n ${demo.body.paymentData.country} \n ${demo.body.paymentData.email} \n ${demo.body.paymentData.address}`;
  return (
    <View>
      <MultiView
        title={title}
        exchange={exchange}
        details={details}
        stylect={styles.container}>
        <View style={styles.textContainer}>
          {props.route.params.type === 'Buy' ? (
            <Text style={styles.text}>You'll receive: 0.00 KSM</Text>
          ) : (
            <Text style={styles.text}>
              Please confirm that you receive the correct amount
            </Text>
          )}
        </View>
        {props.route.params.type === 'Buy' ? 
        // condition through the status the appearance of the button in Sell flow
        <Button label="Confirm Sent" action={() => props.navigation.navigate('TransactionCompleted')} />
        :
        <Button label="Confirm received" action={() => props.navigation.navigate('TransactionCompleted')} />
        }
        <View style={styles.buttons}>
          <Link label="Report a problem" color="#cc5741" />
        </View>
      </MultiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '2%',
    
  },
  textContainer: {
    alignItems: 'center',
    paddingBottom: '5%',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign:'center',
  },
  buttons: {
    paddingTop: '3%',
    alignItems: 'center',
  },
});

export default ConfirmedBuySell;
