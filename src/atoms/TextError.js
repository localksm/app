import React from 'react';
import { Text } from 'react-native';

function TextError({ error, styles, text }) {
  return error ? <Text style={styles.text}>{text}</Text> : <Text></Text>;
}

export default TextError;
