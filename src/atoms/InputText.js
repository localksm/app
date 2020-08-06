import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

function InputText(props) {
  // Handle return key, passing noReturn props will take the return key as an accept instead of intro.
  // This is useful for cases such as withdraw screen where we do not need a multiline input.
  return props.noReturn ? (
    <TextInput
      {...props}
      style={[styles.inputMaterial, props.stylect]}
      onChangeText={props.onChangeText}
      placeholderTextColor="#ffffff"
      returnKeyType="done"
      autoCapitalize={props.autoCapitalize}
      keyboardType={props.keyboardType}
      value={props.value}
    />
  ) : (
    <TextInput
      {...props}
      style={[styles.inputMaterial, props.stylect]}
      onChangeText={props.onChangeText}
      placeholderTextColor="#ffffff"
      autoCapitalize={props.autoCapitalize}
      keyboardType={props.keyboardType}
      value={props.value}
    />
  );
}

const styles = StyleSheet.create({
  inputMaterial: {
    borderBottomWidth: 2,
    marginTop: '5%',
    borderColor: '#ffffff',
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
  },
});

export default InputText;
