import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  InputText,
  DropdownPaymentMethods,
  DropdownCountries,
  DropdownCurrencies,
  SellButton,
  InputLayout
} from '../atoms';
import { FooterWhite, PaymentForm } from '../molecules';
import { ScrollView } from 'react-native-gesture-handler';
import { FormLayout } from '.';

const FormCreateOfferSell = () => {
  const [errors, setErrors] = useState({});
  const [offered, setOffered] = useState('');
  const [required, setRequired] = useState('');
  const [paymentMethod, setPaymentmethod] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [other, setOther] = useState('');
  const [paymentVars, setPaymentVars] = useState({});
  const navigation = useNavigation();
  const variables = {
    offerAmount: offered,
    requestAmount: required,
    paymentMethod: paymentMethod,
    country: country,
    requestAsset: currency,
    other: other,
    operationType: 'withdraw_funds',
  };
  const valueKSM = required && offered ? (1 * required) / offered : '...';
  const screenHeight = Math.round(Dimensions.get('window').height);

  const handleText = (name, value) => {
    setPaymentVars(data => ({ ...data, [name]: value }));
  };

  return (
    <FormLayout.Content>
      <FormLayout.Body>
      <ScrollView
        style={{
          overflow: 'hidden',
          maxHeight:
            screenHeight <= 683 ? 480 : screenHeight >= 700 ? 560 : 500,
        }}>
        <View style={styles.container}>
          <Text style={styles.text}>Offered Currency</Text>
          <InputLayout element="currency" resultValidator={errors} >
            <InputText
              name="Amount"
              keyboardType="numeric"
              placeholder="Amount KSM"
              onChangeText={value => setOffered(value)}
            />
          </InputLayout>
          <Text style={styles.textRequired}>Required Currency</Text>
          <InputLayout element="localCurrency" resultValidator={errors} >
            <DropdownCurrencies action={setCurrency} />
          </InputLayout>
          <InputLayout element="requiredCurrency" resultValidator={errors} >
            <InputText
              name="Amount"
              keyboardType="numeric"
              placeholder={`Amount ${currency}`}
              onChangeText={value => setRequired(value)}
            />
          </InputLayout>
          <InputLayout element="paymentMethod" resultValidator={errors} >
            <DropdownPaymentMethods action={setPaymentmethod} />
          </InputLayout>
          {paymentMethod === 'BN' && <InputLayout element="country" resultValidator={errors} ><DropdownCountries action={setCountry} /></InputLayout>}
          {paymentMethod === 'OT' && (
            <InputLayout element="other" resultValidator={errors} >
              <InputText
                placeholder="Other"
                onChangeText={value => setOther(value)}
              />
            </InputLayout>
          )}
          {paymentMethod !== '' && paymentMethod !== null && (
            <PaymentForm
              show={true}
              method={paymentMethod}
              onChangeText={handleText}
              errors={errors}
            />
          )}
        </View>
      </ScrollView>
      </FormLayout.Body>
      <FormLayout.Footer>
        <View style={styles.footerContainer}>          
          <View style={styles.textFooter}>
            <Text style={styles.footer}>
              1 KSM = $ {valueKSM} {currency}
            </Text>
          </View>
          <SellButton
            label="Send"
            variables={variables}
            paymentVars={paymentVars}
            handlerError={setErrors}
            actionSell={() =>
              navigation.navigate('Confirmation', { body: variables })
            }
          />
        </View>
      </FormLayout.Footer>
    </FormLayout.Content>    
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '7%',
    marginBottom: '5%',
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
    flex: 1,
    paddingHorizontal: '5%',    
    paddingTop: '5%',
  },
});

export default FormCreateOfferSell;
