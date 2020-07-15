import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MultiView, FooterWhite } from '../molecules';
import { Link, Button } from '../atoms';
import { FormLayout } from '.';

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

  const title = `Please wait until ${usernameMaker} sends you`;
  const exchange = `$ ${offerAmount} ${offerAsset}`;

  return (
    <FormLayout.Content>
      <FormLayout.Body>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>{title}</Text>
        </View>
        <View style={styles.exchange}>
          <Text style={styles.text}>{exchange}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.text}>{details}</Text>
        </View>
      </View>
      </FormLayout.Body>
      <FormLayout.Footer>
        <View style={{ flex: 1, marginTop: 10, marginHorizontal:20 }}>
          {operationType === 'withdraw_funds' && <Button label="Confirm sent" />}
          <View style={styles.buttons}>
            <Link
              label="Report a problem"
              color="#cc5741"
              action={() => props.navigation.navigate('ReportAProblem')}
            />
          </View>
        </View>
      </FormLayout.Footer>
    </FormLayout.Content>

  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  buttons: {
    alignItems: 'center',
    marginTop: 20
  },

  container: {
    flexDirection: 'column',
    justifyContent: 'center',
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
  text: {
    textAlign: 'center',
    margin: '10%',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  exchange: {
    paddingHorizontal: '10%',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderBottomColor: 'white',
  },
  details: {
    paddingHorizontal: '20%',
    paddingBottom: '0%',
  },
});

export default AcceptedBuySell;
