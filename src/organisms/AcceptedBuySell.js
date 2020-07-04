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
