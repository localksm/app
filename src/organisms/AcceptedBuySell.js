import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MultiView, FooterWhite } from '../molecules';
import { Link, Button } from '../atoms';
import { demo } from '../utils/demoQuery';


const AcceptedBuySell = props => {
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
       {/* the button only appears in status confirmed for the Maker */}
          {props.route.params.type === 'Sell' &&
              <Button label="Confirm sent" />
           
          }
      </MultiView>
      <FooterWhite stylectContainer={styles.buttons}>
          <Link label="Report a problem" color="#cc5741" action={() => props.navigation.navigate('ReportAProblem')} />
          <Link label="Continue Disburse" color="#cc5741" action={() => props.navigation.navigate('Disburse')} />
      </FooterWhite>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '15%',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  buttons: {
    paddingTop: '1%',
    alignItems: 'center',
    
  },
});

export default AcceptedBuySell;
