import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Link, ConfirmSentBuyButton, ConfirmReceivedButton } from '../atoms';
import FormLayout from './FormLayout';

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
  const variables ={
    proposalId: proposalId,
    takerId: takerId,
    operationType: operationType,
  }

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
        <View style={ styles.containerFooder}>
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
            status === 'confirmed' &&
            <ConfirmReceivedButton
            variables={variables}
            label="Confirm Received"
            actionConfirmSent={() => props.navigation.navigate('TransactionCompleted',{...props.route.params})}
          />
          )}
          <View style={styles.buttons}>
            <Link label="Report a problem" color="#cc5741" action={() => props.navigation.navigate('ReportAProblem')} />
          </View>
        </View>
      </FormLayout.Footer>
    </FormLayout.Content>
  );
};

const styles = StyleSheet.create({
  containerDetail: {
    paddingTop: '0%',
  },
  textContainer: {
    alignItems: 'center'    
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
  containerFooder:{  
    flex: 1, 
    marginTop: '3%', 
    marginHorizontal: '8%' 
  }  
});

export default ConfirmedBuySell;
