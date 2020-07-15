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
  InputLayout,
  Button,
} from '../atoms';
import { splitAmount } from '../utils/splitAmount';
import { FormLayout } from '.';


const FormCreateOfferBuy = props => {
  const [errors, setErrors] = useState({});
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
    offerAsset: currency,
    other: other,
    operationType: 'add_funds',
  };

  const valueKSM = offered && required ? 1 * offered / required : NaN;  
  
  return (
    <FormLayout.Content>
      <FormLayout.Body hpBody="65%">
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Offered Currency</Text>
          <InputLayout element="localCurrency" resultValidator={errors} >
            <DropdownCurrencies action={setCurrency} />
          </InputLayout>
          <InputLayout element="currency" resultValidator={errors} >
            <InputText
              name="Amount"
              keyboardType="numeric"
              placeholder={`Amount ${currency}`}
              onChangeText={value => setOffered(value)}
            />
          </InputLayout>
          <Text style={styles.textRequired}>Required Currency</Text>
          <InputLayout element="requiredCurrency" resultValidator={errors} >
            <InputText
              name="Amount"
              keyboardType="numeric"
              placeholder="Amount KSM"
              onChangeText={value => setRequired(value)}
            />
          </InputLayout>
          <InputLayout element="paymentMethod" resultValidator={errors} >
            <DropdownPaymentMethods action={setPaymentmethod} />
          </InputLayout>
          {paymentMethod === 'BN' && (
            <InputLayout element="country" resultValidator={errors}> 
              <DropdownCountries action={setCountry} /> 
            </InputLayout>
          )}
          {paymentMethod === 'OT' && (
            <InputLayout element="other" resultValidator={errors} >
              <InputText
                placeholder="Other"
                onChangeText={value => setOther(value)}
              />
            </InputLayout>
          )}
          
        </View>
      </ScrollView>
      </FormLayout.Body>
      <FormLayout.Footer hpFooder="35%" >
      <View style={{ flex: 1, marginHorizontal: 30, paddingTop:'5%'}}>            
          <Fees 
            container={"jury"}
            amount={offered?offered: 0 }
            />
            <View style={styles.textFooter}>
              <Text style={styles.footer}>
                1 KSM = $ {splitAmount( Number.isNaN(valueKSM)? 0 : valueKSM )} {currency}
              </Text>
            </View>
            <AddFundsButton
              variables={variables}
              label="Send"
              handlerError={setErrors}
              actionAddFunds={() =>
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
    justifyContent: 'center',
    marginHorizontal: 30,    
    marginBottom: 20
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
    fontFamily: 'Poppins-SemiBold'    
  },
  footerContainer: {
    paddingHorizontal: '5%',
    paddingBottom: '25%',
  },
});

export default FormCreateOfferBuy;
