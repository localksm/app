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
  const [details, setDetails] = React.useState('');

  React.useEffect(() => {
    const str = string();
    setDetails(() => str);
  }, []);

  const navigation = useNavigation()

  const {
    offerAsset,
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
  
  const title = `You received: ${requestAmount} KSM`
  const exchange = `$ ${offerAmount} ${offerAsset}`;
 
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