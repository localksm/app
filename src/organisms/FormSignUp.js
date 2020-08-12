import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputText, ButtonSignUp, TextError } from '../atoms';

const FormSignUp = (props) => {
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

  function getStyles(error) {
    return error && styles.error;
  }

  return [
    <View key="logo" style={styles.secction_logo}>
      <Image
        style={styles.logo}
        source={require('../../assets/logoKSMNoText.png')}
      />
    </View>,
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <InputText
          name="username"
          testID="test-signup-username-change"
          placeholder="Username"
          autoCapitalize="none"
          onChangeText={(value) => {
            setUsername(value), setErrorName(false);
          }}
          error={errorName}
        />
        <TextError
          error={errorName}
          styles={styles.text}
          text="Username is required"
        />
        <InputText
          name="email"
          testID="test-signup-email-change"
          keyboardType="email-address"
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(value) => {
            setEmail(value), setErrorEmail(false), setErrorEmailValid(false);
          }}
          error={errorEmail}
        />
        <TextError
          error={errorEmail}
          styles={styles.text}
          text="Email is required"
        />
        <TextError
          error={errorEmailValid}
          styles={styles.text}
          text="Enter a valid email"
        />
        <InputText
          name="password"
          testID="test-signup-password-change"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => {
            setPassword(value), setErrorPass(false);
          }}
          error={errorPass}
        />
        <TextError
          error={errorPass}
          styles={styles.text}
          text="The password must contain at least 10 alphanumeric characters"
        />
        <InputText
          name="confirmPassword"
          testID="test-signup-password-confirm-change"
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(value) => {
            setConfirmPassword(value), setErrorConfirm(false);
          }}
          error={errorConfirm}
        />
        <TextError
          error={errorConfirm}
          styles={styles.text}
          text="Passwords do not match"
        />
        <View style={styles.button}>
          <ButtonSignUp
            variables={dataSession}
            label="Register"
            stylect={{ backgroundColor: '#DB5A3A' }}
            errorName={setErrorName}
            errorEmail={setErrorEmail}
            errorEmailValid={setErrorEmailValid}
            errorPass={setErrorPass}
            errorConfirm={setErrorConfirm}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>,
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
