import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CompletedMultiView } from '../molecules';
import { Link, Button } from '../atoms';
import { demo } from '../utils/demoQuery';

const Completed = props => {

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
        <Button label="Ok" action={() => props.navigation.navigate('App')} />

        
       
      </CompletedMultiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '15%',
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