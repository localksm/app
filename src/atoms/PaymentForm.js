import React from 'react';
import {Text, View} from 'native-base';
import Textarea from 'react-native-textarea';
import {InputText} from '.';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textareaContainer: {
    height: 150,
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 20,
    borderRadius:10,
    fontFamily: "Poppins-Medium",
    color: 'white',
    fontSize:18,
  },
  subtitle: {
    marginTop: 10,
    fontSize:18,
    fontFamily: "Poppins-Medium",
    color: 'white',
  },
  textAreaContent: { 
    width: '100%', 
    height: '100%', 
    textAlignVertical : "top",
    color: 'white'
  }
});

const inputs = onChangeText => [
  {
    method: 'VE',
    fields: [
      <InputText
        placeholder="Name"
        onChangeText={value => onChangeText('name', value)}
      />,
      <InputText
        placeholder="Last Name"
        onChangeText={value => onChangeText('lastName', value)}
      />,
      <InputText
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={value => onChangeText('email', value)}
      />,
    ],
  },
  {
    method: 'ZE',
    fields: [
      <InputText
        placeholder="Name"
        onChangeText={value => onChangeText('name', value)}
      />,
      <InputText
        placeholder="Last Name"
        onChangeText={value => onChangeText('lastName', value)}
      />,
      <InputText
        placeholder="Account Number"
        onChangeText={value => onChangeText('accountNumber', value)}
      />,
      <InputText
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={value => onChangeText('email', value)}
      />,
    ],
  },
  {
    method: 'MP',
    fields: [
      <InputText
        placeholder="Name"
        onChangeText={value => onChangeText('name', value)}
      />,
      <InputText
        placeholder="Last Name"
        onChangeText={value => onChangeText('lastName', value)}
      />,
      <InputText
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={value => onChangeText('email', value)}
      />,
      <Textarea
        placeholder="Payment Data"
        multiline={true}
        style={styles.textAreaContent}
        containerStyle={styles.textareaContainer}
        onChangeText={value => onChangeText('bankData', value)}
        placeholderTextColor={'#c7c7c7'}
      />,
      <Textarea
        placeholder="Address"
        multiline={true}
        style={styles.textAreaContent}
        containerStyle={styles.textareaContainer}
        onChangeText={value => onChangeText('address', value)}
        placeholderTextColor={'#c7c7c7'}
      />,
    ],
  },
  {
    method: 'WU',
    fields: [
      <InputText
        placeholder="Name"
        onChangeText={value => onChangeText('name', value)}
      />,
      <InputText
        placeholder="Last Name"
        onChangeText={value => onChangeText('lastName', value)}
      />,
      <Textarea
        placeholder="Payment Data"
        multiline={true}
        style={styles.textAreaContent}
        containerStyle={styles.textareaContainer}
        onChangeText={value => onChangeText('bankData', value)}
        placeholderTextColor={'#c7c7c7'}
      />,
      <Textarea
        placeholder="Address"
        multiline={true}
        style={styles.textAreaContent}
        containerStyle={styles.textareaContainer}
        onChangeText={value => onChangeText('address', value)}
        placeholderTextColor={'#c7c7c7'}
      />,
    ],
  },
  {
    method: 'MG',
    fields: [
      <InputText
        placeholder="Name"
        onChangeText={value => onChangeText('name', value)}
      />,
      <InputText
        placeholder="Last Name"
        onChangeText={value => onChangeText('lastName', value)}
      />,
      <InputText
        keyboardType="numeric"
        placeholder="Phone Number"
        onChangeText={value => onChangeText('phone', value)}
      />,
      <Textarea
        placeholder="Address"
        multiline={true}
        style={styles.textAreaContent}
        containerStyle={styles.textareaContainer}
        onChangeText={value => onChangeText('address', value)}
        placeholderTextColor={'#c7c7c7'}
      />,
      <Textarea
        placeholder="Payment Data"
        multiline={true}
        style={styles.textAreaContent}
        containerStyle={styles.textareaContainer}
        onChangeText={value => onChangeText('bankData', value)}
        placeholderTextColor={'#c7c7c7'}
      />,
    ],
  },
  {
    method: 'NE',
    fields: [
      <InputText
        placeholder="Name"
        onChangeText={value => onChangeText('name', value)}
      />,
      <InputText
        placeholder="Last Name"
        onChangeText={value => onChangeText('lastName', value)}
      />,
      <InputText
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={value => onChangeText('email', value)}
      />,
    ],
  },
  {
    method: 'UP',
    fields: [
      <InputText
        placeholder="Name"
        onChangeText={value => onChangeText('name', value)}
      />,
      <InputText
        placeholder="Last Name"
        onChangeText={value => onChangeText('lastName', value)}
      />,
      <InputText
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={value => onChangeText('email', value)}
      />,
    ],
  },
  {
    method: 'PP',
    fields: [
      <InputText
        placeholder="Name"
        onChangeText={value => onChangeText('name', value)}
      />,
      <InputText
        placeholder="Last Name"
        onChangeText={value => onChangeText('lastName', value)}
      />,
      <InputText
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={value => onChangeText('email', value)}
      />,
    ],
  },
  {
    method: 'BN',
    fields: [
      <InputText
        placeholder="Name"
        onChangeText={value => onChangeText('name', value)}
      />,
      <InputText
        placeholder="Last Name"
        onChangeText={value => onChangeText('lastName', value)}
      />,
      <Textarea
        placeholder="Payment Data"
        multiline={true}
        style={styles.textAreaContent}
        containerStyle={styles.textareaContainer}
        onChangeText={value => onChangeText('bankData', value)}
        placeholderTextColor={'#c7c7c7'}        
      />,
    ],
  },
  {
    method: 'OT',
    fields: [],
  },
];

function renderForm(method, onChangeText) {
  const element = inputs(onChangeText).find(e => e.method === method);
  return element.fields;
}

function PaymentForm({show, method, onChangeText}) {
  return (
    show && (
      <View>
        {method !== 'OT' && <Text style={styles.subtitle}>Payment Details</Text>}
        <View>{renderForm(method, onChangeText)}</View>
      </View>
    )
  );
}

export default PaymentForm;
