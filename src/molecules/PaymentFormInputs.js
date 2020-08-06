import React from 'react';
import { FormInput } from './';
import { paymentMethods } from '../utils/misc';

function DynamicPaymentFormInputs({ method, onChangeText, errors, styles }) {
  return (
    <>
      {paymentMethods[method].fields.map((item, key) => (
        <FormInput
          key={key}
          element={item.element}
          placeholder={item.placeholder}
          onChangeText={onChangeText}
          errors={errors}
          styles={styles}
          type={item.type}
          keyboardType={item.keyboardType}
          autoCapitalize={item.autoCapitalize}
        />
      ))}
    </>
  );
}

export default DynamicPaymentFormInputs;
