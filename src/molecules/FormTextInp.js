import React from 'react';

const { InputLayout, InputText } = require('../atoms');

function FormTextInp({
  element,
  placeholder,
  keyboardType,
  autoCapitalize,
  onChangeText,
  errors,
}) {
  return (
    <InputLayout element={element} resultValidator={errors}>
      <InputText
        placeholder={placeholder}
        onChangeText={(value) => onChangeText(element, value)}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </InputLayout>
  );
}

export default FormTextInp;
