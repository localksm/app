import React from 'react';
import { Text } from 'react-native';

function TextError({ error, text }) {
  return error ? (
    <Text
      style={{
        fontSize: 10,
        color: 'red',
        fontFamily: 'Poppins-SemiBold',
      }}>
      {text}
    </Text>
  ) : (
    <Text></Text>
  );
}

export default TextError;
