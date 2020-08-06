import React from 'react';
import Textarea from 'react-native-textarea';

const { InputLayout } = require('../atoms');

function FormTextAreaInp({
  element,
  placeholder,
  onChangeText,
  errors,
  styles,
}) {
  return (
    <InputLayout element={element} resultValidator={errors}>
      <Textarea
        placeholder={placeholder}
        multiline={true}
        style={styles.textAreaContent}
        containerStyle={styles.textareaContainer}
        onChangeText={(value) => onChangeText(element, value)}
        placeholderTextColor={'#c7c7c7'}
      />
    </InputLayout>
  );
}

export default FormTextAreaInp;
