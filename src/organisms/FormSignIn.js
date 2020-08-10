import React, { useState, useEffect } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { getPin } from '../utils/JWT';
import { fetchBalacnce } from '../utils/ksm';
import FormSignInContent from './FormSignInContent';

const FormSignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);

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
      setPin(response);
    }
    newPin();
  }, []);

  const goToLogin = () => {
    fetchBalacnce();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Drawer' }],
      }),
    );
  };

  return (
    <FormSignInContent
      pin={pin}
      setPin={setPin}
      verifyPin={verifyPin}
      setVeriFyPin={setVeriFyPin}
      setEmail={setEmail}
      errorEmail={errorEmail}
      setErrorEmail={setErrorEmail}
      setErrorPass={setErrorPass}
      setPassword={setPassword}
      errorPass={errorPass}
      goToLogin={goToLogin}
      dataSession={dataSession}
      navigation={navigation}
    />
  );
};

export default FormSignIn;
