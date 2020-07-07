import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  InputText,
  AddFundsButton,
  Fees, // TODO: Add fees to form
  DropdownPaymentMethods,
  DropdownCountries,
  DropdownCurrencies,
} from '../atoms';
import { FooterWhite } from '../molecules';

const FormCreateOfferBuy = props => {
  const [offered, setOffered] = useState('0');
  const [required, setRequired] = useState('0');
  const [paymentMethod, setPaymentmethod] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [other, setOther] = useState('');
  const navigation = useNavigation();
  const variables = {
    offerAmount: offered,
    requestAmount: required,
    paymentMethod: paymentMethod,
    country: country,
    requestAsset: currency,
    other: other,
    operationType: 'add_funds',
  };

  const valueKSM = 1 * offered / required
  
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Offered Currency</Text>
          <DropdownCurrencies action={setCurrency} />
          <InputText
            name="Amount"
            keyboardType="numeric"
            placeholder="Amount USD"
            onChangeText={value => setOffered(value)}
          />
          <Text style={styles.textRequired}>Required Currency</Text>
          <InputText
            name="Amount"
            keyboardType="numeric"
            placeholder="Amount KSM"
            onChangeText={value => setRequired(value)}
          />
          <DropdownPaymentMethods action={setPaymentmethod} />
          {paymentMethod === 'BN' && <DropdownCountries action={setCountry} />}
          {paymentMethod === 'OT' && (
            <InputText
              placeholder="Other"
              onChangeText={value => setOther(value)}
            />
          )}
          
        </View>
      </ScrollView>
      <FooterWhite stylectContainer={styles.footerContainer}>
        <Fees 
            container={"jury"}
            amount={offered}
            />
        <View style={styles.textFooter}>
          <Text style={styles.footer}>
            1 KSM = $ {valueKSM} {currency}
          </Text>
        </View>
        <AddFundsButton
          variables={variables}
          label="Send"
          actionAddFunds={() =>
            navigation.navigate('Confirmation', { body: variables })
          }
        />
      </FooterWhite>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  text: {
    paddingTop: '1%',
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  textRequired: {
    paddingTop: '12%',
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  textFooter: {
    alignItems: 'center',
  },
  footer: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    paddingBottom: 10,
  },
  footerContainer: {
    paddingHorizontal: '5%',
    paddingBottom: '25%',
  },
});

export default FormCreateOfferBuy;
