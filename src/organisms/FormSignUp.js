import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputText, ButtonSignUp } from '../atoms';
import { set } from 'react-native-reanimated';

const FormSignUp = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailValid, setErrorEmailValid] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [errorConfirm, setErrorConfirm] = useState(false);
  const navigation = useNavigation();
  const dataSession = {
    username,
    email,
    password,
    confirmPassword,
  };

  return [
    <View key="logo" style={styles.secction_logo}>
      <Image
        style={styles.logo}
        source={require('../../assets/logoKSMNoText.png')}
      />
    </View>,
    <View style={styles.container}>
      <InputText
        name="username"
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={value => {
          setUsername(value), setErrorName(false);
        }}
        stylect={errorName && styles.error}
      />
      {errorName && <Text style={styles.text}>Username is required</Text>}
      <InputText
        name="email"
        keyboardType="email-address"
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={value => {
          setEmail(value), setErrorEmail(false), setErrorEmailValid(false);
        }}
        stylect={
          (errorEmail && styles.error) || (errorEmailValid && styles.error)
        }
      />
      {errorEmail && <Text style={styles.text}>Email is required</Text>}
      {errorEmailValid && <Text style={styles.text}>Enter a valid email</Text>}
      <InputText
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={value => {
          setPassword(value), setErrorPass(false);
        }}
        stylect={errorPass && styles.error}
      />
      {errorPass && (
        <Text style={styles.text}>
          The password must contain at least 10 alphanumeric characters
        </Text>
      )}
      <InputText
        name="confirmPassword"
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={value => {
          setConfirmPassword(value), setErrorConfirm(false);
        }}
        stylect={errorConfirm && styles.error}
      />
      {errorConfirm && <Text style={styles.text}>Passwords do not match</Text>}
      <View style={styles.button}>
        <ButtonSignUp
          variables={dataSession}
          label="Register"
          stylect={{ backgroundColor: '#DB5A3A' }}
          actionSignUp={() => navigation.navigate('Drawer')}
          errorName={() => setErrorName(true)}
          errorEmail={() => setErrorEmail(true)}
          errorEmailValid={() => setErrorEmailValid(true)}
          errorPass={() => setErrorPass(true)}
          errorConfirm={() => setErrorConfirm(true)}
        />
      </View>
    </View>,
  ];
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '10%',
    paddingHorizontal: '5%',
  },
  secction_logo: {
    paddingTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    resizeMode: 'contain',
  },
  button: {
    paddingTop: '10%',
  },
  error: {
    borderColor: 'red',
    borderBottomWidth: 1,
    color: 'red',
  },
  text: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default FormSignUp;
