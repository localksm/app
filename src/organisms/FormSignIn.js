import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import {
  InputText,
  Link,
  GoogleButton,
  FBLoginButton,
  ButtonSignIn,
  TWLoginButton,
} from '../atoms';
import { getPin } from '../utils/JWT';
import EnterPin from './EnterPin';
import { fetchBalacnce } from '../utils/ksm';

const FormSignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [requestPin, setRequestPin] = useState(false);
  const [launchStartTwitter, setLaunchStartTwitter] = useState(false);
  const [launchStartFacebook, setLaunchStartFacebook] = useState(false);
  const [currentLogin, setCurrentLogin] = useState('');

  const [pin, setPin] = useState('');
  const [verifyPin, setVeriFyPin] = useState(false);
  const navigation = useNavigation();

  const dataSession = {
    email: email,
    password: password,
    pin: pin,
  };
  useEffect(() => {
    async function newPin() {
      const response = await getPin();
      if (response !== null) {
        return setPin(response);
      }
    }
    newPin();
  }, []);

  const goToLogin = () =>{
    fetchBalacnce();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Drawer' }],
      }),
    );
  }    

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
            name="email"
            keyboardType="email-address"
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={value => {
              setErrorEmail(false), setEmail(value);
            }}
            stylect={errorEmail && styles.error}
          />
          <InputText
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={value => {
              setErrorPass(false), setPassword(value);
            }}
            stylect={errorPass && styles.error}
          />
          <TouchableOpacity>
            <Text style={styles.textForgot}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.buttons}>
            <ButtonSignIn
              label="Login"
              stylect={{ backgroundColor: '#DB5A3A' }}
              actionLogin={() => (pin !== null ? goToLogin() : () => {})}
              actionPin={() => setVeriFyPin(true)}
              variables={dataSession}
              actionErrorEmail={() => setErrorEmail(true)}
              actionErrorPass={() => setErrorPass(true)}
            />
          </View>
          <View style={styles.buttons}>
            <GoogleButton
              label="Login with Google"
              stylect={{ backgroundColor: '#6BA3FA' }}
              actionLogin={goToLogin}
              actionPin={() => setVeriFyPin(true)}
            />
          </View>

          <View style={styles.buttons}>
            <FBLoginButton
              type={'signin'}
              init={launchStartFacebook && currentLogin === 'Facebook'}
              actionPin={() => setVeriFyPin(true)}
              actionLogin={goToLogin}
            />
          </View>
          <View style={styles.buttons}>
            <TWLoginButton
              label="Login with Twitter"
              stylect={{ backgroundColor: '#58C5FA' }}
              init={launchStartTwitter && currentLogin === 'Twitter'}
              actionPin={() => setVeriFyPin(true)}
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
      action={token => {
        setPin(token);
        setVeriFyPin(false);
      }}
      actionLogin={goToLogin}
    />
  );
};

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

export default FormSignIn;
