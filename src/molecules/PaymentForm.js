import React from 'react';
import {Text, View} from 'native-base';
import Textarea from 'react-native-textarea';
import {InputText, InputLayout} from '../atoms';
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

const inputs = (onChangeText, errors) => [
  {
    method: 'VE',
    fields: [
      <InputLayout element="name" resultValidator={errors} >
        <InputText
          placeholder="Name"
          onChangeText={value => onChangeText('name', value)}
        />
      </InputLayout>,
      <InputLayout element="lastName" resultValidator={errors} >
        <InputText
          placeholder="Last Name"
          onChangeText={value => onChangeText('lastName', value)}
        />
      </InputLayout>,
      <InputLayout element="email" resultValidator={errors} >
        <InputText
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={value => onChangeText('email', value)}
        />
      </InputLayout>
      ,
    ],
  },
  {
    method: 'ZE',
    fields: [
      <InputLayout element="name" resultValidator={errors} >
        <InputText
          placeholder="Name"
          onChangeText={value => onChangeText('name', value)}
        />
      </InputLayout>,
      <InputLayout element="lastName" resultValidator={errors} >
        <InputText
          placeholder="Last Name"
          onChangeText={value => onChangeText('lastName', value)}
        />
      </InputLayout>,
      <InputLayout element="accountNumber" resultValidator={errors} >
        <InputText
          placeholder="Account Number"
          onChangeText={value => onChangeText('accountNumber', value)}
        />
      </InputLayout>,
      <InputLayout element="email" resultValidator={errors} >
        <InputText
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={value => onChangeText('email', value)}
        />
      </InputLayout>,
    ],
  },
  {
    method: 'MP',
    fields: [
      <InputLayout element="name" resultValidator={errors} >
        <InputText
          placeholder="Name"
          onChangeText={value => onChangeText('name', value)}
        />
      </InputLayout>,
      <InputLayout element="lastName" resultValidator={errors} >
        <InputText
          placeholder="Last Name"
          onChangeText={value => onChangeText('lastName', value)}
        />
      </InputLayout>,
      <InputLayout element="email" resultValidator={errors} >
        <InputText
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={value => onChangeText('email', value)}
        />
      </InputLayout>,
      <InputLayout element="bankData" resultValidator={errors} >
        <Textarea
          placeholder="Payment Data"
          multiline={true}
          style={styles.textAreaContent}
          containerStyle={styles.textareaContainer}
          onChangeText={value => onChangeText('bankData', value)}
          placeholderTextColor={'#c7c7c7'}
        />
      </InputLayout>,
      <InputLayout element="address" resultValidator={errors} >
        <Textarea
          placeholder="Address"
          multiline={true}
          style={styles.textAreaContent}
          containerStyle={styles.textareaContainer}
          onChangeText={value => onChangeText('address', value)}
          placeholderTextColor={'#c7c7c7'}
        />
      </InputLayout>,
    ],
  },
  {
    method: 'WU',
    fields: [
      <InputLayout element="name" resultValidator={errors} >
        <InputText
          placeholder="Name"
          onChangeText={value => onChangeText('name', value)}
        />
      </InputLayout>,
      <InputLayout element="lastName" resultValidator={errors} >
        <InputText
          placeholder="Last Name"
          onChangeText={value => onChangeText('lastName', value)}
        />
      </InputLayout>,
      <InputLayout element="bankData" resultValidator={errors} >
        <Textarea
          placeholder="Payment Data"
          multiline={true}
          style={styles.textAreaContent}
          containerStyle={styles.textareaContainer}
          onChangeText={value => onChangeText('bankData', value)}
          placeholderTextColor={'#c7c7c7'}
        />
      </InputLayout>,
      <InputLayout element="bankData" resultValidator={errors} >
        <Textarea
          placeholder="Address"
          multiline={true}
          style={styles.textAreaContent}
          containerStyle={styles.textareaContainer}
          onChangeText={value => onChangeText('address', value)}
          placeholderTextColor={'#c7c7c7'}
        />
      </InputLayout>,
    ],
  },
  {
    method: 'MG',
    fields: [
      <InputLayout element="name" resultValidator={errors} >
        <InputText
          placeholder="Name"
          onChangeText={value => onChangeText('name', value)}
        />
      </InputLayout>,
      <InputLayout element="lastName" resultValidator={errors} >
        <InputText
          placeholder="Last Name"
          onChangeText={value => onChangeText('lastName', value)}
        />
      </InputLayout>,
      <InputLayout element="phone" resultValidator={errors} >
        <InputText
          keyboardType="numeric"
          placeholder="Phone Number"
          onChangeText={value => onChangeText('phone', value)}
        />
      </InputLayout>,
      <InputLayout element="address" resultValidator={errors} >
        <Textarea
          placeholder="Address"
          multiline={true}
          style={styles.textAreaContent}
          containerStyle={styles.textareaContainer}
          onChangeText={value => onChangeText('address', value)}
          placeholderTextColor={'#c7c7c7'}
        />
      </InputLayout>,
      <InputLayout element="bankData" resultValidator={errors} >
        <Textarea
          placeholder="Payment Data"
          multiline={true}
          style={styles.textAreaContent}
          containerStyle={styles.textareaContainer}
          onChangeText={value => onChangeText('bankData', value)}
          placeholderTextColor={'#c7c7c7'}
        />
      </InputLayout>,
    ],
  },
  {
    method: 'NE',
    fields: [
      <InputLayout element="name" resultValidator={errors} >
        <InputText
          placeholder="Name"
          onChangeText={value => onChangeText('name', value)}
        />
      </InputLayout>,
      <InputLayout element="lastName" resultValidator={errors} >
        <InputText
          placeholder="Last Name"
          onChangeText={value => onChangeText('lastName', value)}
        />
      </InputLayout>,
      <InputLayout element="email" resultValidator={errors} >
        <InputText
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={value => onChangeText('email', value)}
        />
      </InputLayout>,
    ],
  },
  {
    method: 'UP',
    fields: [
      <InputLayout element="name" resultValidator={errors} >
        <InputText
          placeholder="Name"
          onChangeText={value => onChangeText('name', value)}
        />
      </InputLayout>,
      <InputLayout element="lastName" resultValidator={errors} >
        <InputText
          placeholder="Last Name"
          onChangeText={value => onChangeText('lastName', value)}
        />
      </InputLayout>,
      <InputLayout element="email" resultValidator={errors} >
        <InputText
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={value => onChangeText('email', value)}
        />
      </InputLayout>,
    ],
  },
  {
    method: 'PP',
    fields: [
      <InputLayout element="name" resultValidator={errors} >
        <InputText
          placeholder="Name"
          onChangeText={value => onChangeText('name', value)}
        />
      </InputLayout>,
      <InputLayout element="lastName" resultValidator={errors} >
        <InputText
          placeholder="Last Name"
          onChangeText={value => onChangeText('lastName', value)}
        />
      </InputLayout>,
      <InputLayout element="email" resultValidator={errors} >
        <InputText
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={value => onChangeText('email', value)}
        />
      </InputLayout>,
    ],
  },
  {
    method: 'BN',
    fields: [
      <InputLayout element="name" resultValidator={errors} >
        <InputText
          placeholder="Name"
          onChangeText={value => onChangeText('name', value)}
        />
      </InputLayout>,
      <InputLayout element="lastName" resultValidator={errors} >
        <InputText
          placeholder="Last Name"
          onChangeText={value => onChangeText('lastName', value)}
        />
      </InputLayout>,
      <InputLayout element="bankData" resultValidator={errors} >
        <Textarea
          placeholder="Payment Data"
          multiline={true}
          style={styles.textAreaContent}
          containerStyle={styles.textareaContainer}
          onChangeText={value => onChangeText('bankData', value)}
          placeholderTextColor={'#c7c7c7'}        
        />
      </InputLayout>,
    ],
  },
  {
    method: 'OT',
    fields: [],
  },
];

function renderForm(method, onChangeText, errors) {
  const element = inputs(onChangeText, errors).find(e => e.method === method);
  return element.fields;
}

function PaymentForm({show, method, onChangeText, errors}) {
  return (
    show && (
      <View>
        {method !== 'OT' && <Text style={styles.subtitle}>Payment Details</Text>}
        <View>{renderForm(method, onChangeText, errors)}</View>
      </View>
    )
  );
}

export default PaymentForm;
