import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  InputText,
  Button,
  DropdownPaymentMethods,
  DropdownCountries,
  DropdownCurrencies,
} from '../atoms';
import { FooterWhite } from '../molecules';
import { ScrollView } from 'react-native-gesture-handler';

const FormCreateOfferSell = () => {
  const [offered, setOffered] = useState('');
  const [required, setRequired] = useState('');
  const [paymentMethods, setPaymentmethod] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [other, setOther] = useState('');
  const variables = {
    offered: offered,
    required: required,
    paymentMethods: paymentMethods,
    country: country,
    currency: currency,
    other: other,
  }
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Offered Currency</Text>
          <InputText
            name="Amount"
            keyboardType='numeric'
            placeholder="Amount USD"
            onChangeText={value => setOffered(value)}
          />
          <Text style={styles.textRequired}>Required Currency</Text>
          <DropdownCurrencies action={setCurrency} />
          <InputText
            name="Amount"
            keyboardType='numeric'
            placeholder="Amount KSM"
            onChangeText={value => setRequired(value)}
          />
          <DropdownPaymentMethods action={setPaymentmethod} />
          {paymentMethods === 'BN' && <DropdownCountries action={setCountry} />}
          {paymentMethods === 'OT' && (
            <InputText
              placeholder="Other"
              onChangeText={value => setOther(value)}
            />
          )}
        </View>
      </ScrollView>
      <FooterWhite stylectContainer={styles.footerContainer}>
        <View style={styles.textFooter}>
          <Text style={styles.footer}>1 XLM = $00.00 USD</Text>
        </View>
        <Button
          label="Send"
          action={() =>
            navigation.navigate('Confirmation', { typeOffer: 'Sell', variables: variables })
          }
        />
      </FooterWhite>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '7%',
  },
  text: {
    paddingTop: '5%',
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

export default FormCreateOfferSell;
