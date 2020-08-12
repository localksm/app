import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  InputText,
  Link,
  GoogleButton,
  FBLoginButton,
  ButtonSignIn,
  TWLoginButton,
} from '../atoms';
import EnterPin from './EnterPin';

function FormSignInContent({
  pin,
  verifyPin,
  setPin,
  setVeriFyPin,
  setEmail,
  setErrorEmail,
  errorEmail,
  setErrorPass,
  setPassword,
  errorPass,
  goToLogin,
  dataSession,
  navigation,
}) {
  return !verifyPin ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.wrapper}>
        <View key="logo" style={styles.secction_logo}>
          <Image
            style={styles.logo}
            source={require('../../assets/logoKSMNoText.png')}
          />
        </View>
        <View style={styles.container}>
          <InputText
            testID="test-email-input"
            name="email"
            keyboardType="email-address"
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(value) => {
              setErrorEmail(false), setEmail(value);
            }}
            error={errorEmail}
          />
          <InputText
            testID="test-pwd-input"
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(value) => {
              setErrorPass(false), setPassword(value);
            }}
            error={errorPass}
          />
          <TouchableOpacity>
            <Text style={styles.textForgot}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.buttons}>
            <ButtonSignIn
              label="Login"
              stylect={{ backgroundColor: '#DB5A3A' }}
              pin={pin}
              goToLogin={goToLogin}
              actionPin={setVeriFyPin}
              setVeriFyPin={setVeriFyPin}
              variables={dataSession}
              actionErrorEmail={setErrorEmail}
              actionErrorPass={setErrorPass}
            />
          </View>
          <View style={styles.buttons}>
            <GoogleButton
              label="Login with Google"
              stylect={{ backgroundColor: '#6BA3FA' }}
              actionLogin={goToLogin}
              actionPin={setVeriFyPin}
            />
          </View>

          <View style={styles.buttons}>
            <FBLoginButton
              type={'signin'}
              actionPin={setVeriFyPin}
              actionLogin={goToLogin}
            />
          </View>
          <View style={styles.buttons}>
            <TWLoginButton
              label="Login with Twitter"
              stylect={{ backgroundColor: '#58C5FA' }}
              actionPin={setVeriFyPin}
              actionLogin={goToLogin}
            />
          </View>

          <View style={styles.styleLink}>
            <Link
              label="New user? Register"
              action={() => navigation.navigate('SignUp')}
              color="#ffffff"
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <EnterPin
      isLogin
      setPin={setPin}
      setScreen={setVeriFyPin}
      actionLogin={goToLogin}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    top: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  secction_logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 20,
  },
  container: {
    paddingVertical: '0%',
    paddingHorizontal: '5%',
  },
  textForgot: {
    color: '#ffffff',
    marginTop: 10,
    paddingRight: 10,
    alignSelf: 'flex-end',
    fontSize: 14,
  },
  styleLink: {
    paddingTop: '10%',
    alignItems: 'center',
  },
  buttons: {
    paddingVertical: '20%',
    paddingTop: '3%',
    paddingBottom: '1%',
  },
  error: {
    borderColor: 'red',
    borderBottomWidth: 1,
    color: 'red',
  },
});

export default FormSignInContent;
