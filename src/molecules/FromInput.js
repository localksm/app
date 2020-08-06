import React from 'react';
import { FormTextInp, FormTextAreaInp } from './';

function FormInput({
  element,
  placeholder,
  onChangeText,
  errors,
  styles,
  type,
  autoCapitalize,
  keyboardType,
}) {
  return type === 'input' ? (
    <FormTextInp
      element={element}
      placeholder={placeholder}
      onChangeText={onChangeText}
      errors={errors}
      styles={styles}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
  ) : (
    <FormTextAreaInp
      element={element}
      placeholder={placeholder}
      onChangeText={onChangeText}
      errors={errors}
      styles={styles}
    />
  );
}

export default FormInput;
