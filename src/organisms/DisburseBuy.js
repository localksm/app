import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MultiView, FooterWhite } from '../molecules';
import { ScrollView } from 'react-native-gesture-handler';
import { Link, Button, ConfirmReceivedButton } from '../atoms';

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

const DisburseBuy = props => {
  const [details, setDetails] = React.useState('');

  React.useEffect(() => {
    const str = string();
    setDetails(() => str);
  }, []);
  

  const {
    usernameMaker,
    offerAsset,
    offerAmount,
    paymentMethod,
    takerId
  } = props.route.params.body;

  const {
    accountNumber,
    address,
    bankData,
    email,
    lastName,
    name,
    phone,
    proposalId
  } = props.route.params.body.paymentData;

  const variables ={
    proposalId: proposalId,
    takerId: takerId,
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

  const title = `${usernameMaker} has sent you`
  const exchange = `$ ${offerAmount} ${offerAsset}`;
  
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

        <ConfirmReceivedButton
          variables={variables}
          label="Confirm Sent"
          actionConfirmSent={() => props.navigation.navigate('TransactionCompleted',{...props.route.params})}
        />
        <View style={styles.link} >
          <Link label="Report a problem" color="#cc5741" action={()=> props.navigation.navigate('ReportAProblem',{...props.route.params})} />
        </View>
      </FooterWhite>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '80%',
  },
  textContainer: {
    paddingBottom: '20%',
    paddingHorizontal: '10%',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    paddingBottom: 20
  },
  link:{
    paddingHorizontal: '25%',
    paddingTop: 20,
  }
});

export default DisburseBuy;
