import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

function cleanText(val) {
  return typeof val === 'string'
    ? val.replace(/[`~!#$%^&*()|·+\-=÷¿?;:'",<>\{\}\[\]\\\/]/gi, '')
    : val;
}

function InputText(props) {
  return (
    <TextInput
      {...props}
      style={[styles.inputMaterial, props.stylect]}
      onChangeText={value => {
        props.onChangeText(cleanText(value));
      }}
      placeholderTextColor='#ffffff'
     
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
    fontFamily: "Poppins-Regular",
  },
});

export default InputText;