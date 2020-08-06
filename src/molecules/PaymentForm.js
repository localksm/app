import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import PaymentFormInputs from './PaymentFormInputs';

const styles = StyleSheet.create({
  textareaContainer: {
    height: 150,
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 20,
    borderRadius: 10,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 18,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
  textAreaContent: {
    width: '100%',
    height: '100%',
    textAlignVertical: 'top',
    color: 'white',
  },
});

function PaymentForm({ show, method, onChangeText, errors }) {
  return (
    show && (
      <View>
        {method !== 'OT' && (
          <Text style={styles.subtitle}>Payment Details</Text>
        )}
        <View>
          <PaymentFormInputs
            method={method}
            onChangeText={onChangeText}
            errors={errors}
            styles={styles}
          />
        </View>
      </View>
    )
  );
}

export default PaymentForm;
