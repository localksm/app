import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  InputText,
  DropdownPaymentMethods,
  DropdownCountries,
  DropdownCurrencies,
  SellButton,
  InputLayout,
} from '../atoms';
import { PaymentForm } from '../molecules';
import { FormLayout } from '.';
import { splitAmount } from '../utils/splitAmount';

const FormCreateOfferSell = () => {
  const [errors, setErrors] = useState({});
  const [offered, setOffered] = useState('');
  const [required, setRequired] = useState('');
  const [paymentMethod, setPaymentmethod] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [other, setOther] = useState('');
  const [paymentVars, setPaymentVars] = useState({});
  const [load, setLoad] = useState(false);
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
  const localCurrencyValue = required && offered ? (1 * required) / offered : 0;

  const handleText = (name, value) => {
    setPaymentVars(data => ({ ...data, [name]: value }));
  };

  return (
    <FormLayout.Content>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <FormLayout.Body>
          <ScrollView
            style={{
              overflow: 'hidden',
            }}>
            <View style={styles.container}>
              <Text style={styles.text}>Offered Currency</Text>
              <InputLayout element="currency" resultValidator={errors}>
                <InputText
                  name="Amount"
                  testID="test-onchange-ksm-amount"
                  keyboardType="numeric"
                  placeholder="Amount KSM"
                  onChangeText={value => setOffered(value)}
                  stylect={{ fontStyle: 'normal', fontSize: 15 }}
                />
              </InputLayout>
              <Text style={styles.textRequired}>Required Currency</Text>
              <InputLayout element="localCurrency" resultValidator={errors}>
                <DropdownCurrencies action={setCurrency} />
              </InputLayout>
              <InputLayout element="requiredCurrency" resultValidator={errors}>
                <InputText
                  name="Amount"
                  testID="test-onchange-amount"
                  keyboardType="numeric"
                  placeholder={`Amount ${currency}`}
                  onChangeText={value => setRequired(value)}
                  stylect={{ fontStyle: 'normal', fontSize: 15 }}
                />
              </InputLayout>
              <InputLayout element="paymentMethod" resultValidator={errors}>
                <DropdownPaymentMethods action={setPaymentmethod} />
              </InputLayout>
              {paymentMethod === 'BN' && (
                <InputLayout element="country" resultValidator={errors}>
                  <DropdownCountries action={setCountry} />
                </InputLayout>
              )}
              {paymentMethod === 'OT' && (
                <InputLayout element="other" resultValidator={errors}>
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
      </TouchableWithoutFeedback>
      <FormLayout.Footer>
        <View style={styles.footerContainer}>
          <View style={styles.textFooter}>
            <Text style={styles.footer}>
              1 KSM = $ { splitAmount(localCurrencyValue, 2)} {currency}
            </Text>
          </View>
          <SellButton
            load={load}
            setLoad={setLoad}
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
