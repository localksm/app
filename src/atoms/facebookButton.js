import React, { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import Button from './Button';
import { LOGIN, SIGNUP } from '../apollo/mutations';
import { sessionModel as session } from '../utils/config';
import { setSession, client } from '../apollo';
import { VERIFY_USER } from '../apollo/queries';
import { fetchBalacnce } from '../utils/ksm';
import { getPin } from '../utils/JWT';

validateEmail = async (email, name) => {
  const response = await client.query({
    query: VERIFY_USER,
    variables: {
      email: email,
      name: name,
    },
  });

  const { emailExists } = response.data.verifyUser;
  return { emailExists };
};

const FBLoginButton = props => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [loginFacebook] = useMutation(LOGIN);

  useEffect(() => {
    if (props.init) {
      props.actionPin(false);
      _signIn();
    }
  }, []);

  const applyFetchBalacnce = () => {
    fetchBalacnce();
  };

  const mapUser = data => {
    session['id'] = data.id;
    session['token'] = data.token;
    session['email'] = data.email;
    session['name'] = data.email;
    session['__typename'] = data.__typename;
    session['sessionType'] = 'facebook';

    return session;
  };

  const _initUser = async token => {
    const fbResProxy = await fetch(
      'https://graph.facebook.com/v2.5/me?fields=id,name,email&access_token=' +
        token,
    );

    const fbRes = await fbResProxy.json();
    const { email, name, id } = fbRes;
    const pin = await getPin();

    const payload = {
      email: email,
      type: 'facebook',
      userFBID: id,
      token,
      platform: Platform.OS === 'ios' ? 'ios' : 'android',
      pin: pin,
    };

    const { emailExists } = await validateEmail(email, name);
    setloading(true);
    if (!emailExists) {
      const resultSignUp = await _registerUser(token);
      const {
        data: { signup },
      } = resultSignUp;
      if (!signup.success) {
        setloading(false);
        alert('Try later');
        return;
      }
    }

    const result = await loginFacebook({ variables: payload });
    if (result.data) {
      const {
        data: { login },
      } = result;
      const sessionResult = mapUser(login);
      setloading(false);
      setSession({ session: sessionResult });

      // Check for pin before verifying and after setting session
      if (pin === null || pin === '') {
        return props.actionPin(true);
      }

      applyFetchBalacnce();
      props.actionLogin();
    } else {
      setloading(false);
    }
  };

  const _signIn = async props => {
    const loginManager = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (loginManager.isCancelled) {
      alert('Login cancelled');
    } else {
      const data = await AccessToken.getCurrentAccessToken();
      _initUser(data.accessToken.toString());
    }
  };

  const _signUp = async () => {
    const loginManager = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (loginManager.isCancelled) {
      alert('Login cancelled');
    } else {
      const data = await AccessToken.getCurrentAccessToken();
      const sessionResult = await _registerUser(data.accessToken.toString());
      const {
        data: { signup },
      } = sessionResult;
      if (signup.success) {
        applyFetchBalacnce();
        props.actionLogin();
      }
    }
  };

  const _registerUser = async token => {
    const fbResProxy = await fetch(
      'https://graph.facebook.com/v2.5/me?fields=id,name,email&access_token=' +
        token,
    );

    const fbRes = await fbResProxy.json();
    const { emailExists } = await validateEmail(fbRes.email, fbRes.name);

    if (emailExists) {
      setloading(false);

      return Alert.alert(
        'Warning!',
        'The email of this social network is already registered',
        [{ text: 'Try again?' }],
      );
    } else {
      const payload = {
        name: fbRes.name,
        email: fbRes.email,
        type: 'facebook',
        token,
        userFBID: fbRes.id,
        platform: Platform.OS === 'ios' ? 'ios' : 'android',
      };

      // Navigate to CreatePin Screen
      navigation.navigate('CreatePin', { payload });
    }
  };

  return (
    <Button
      label="Login with Facebook"
      stylect={{ backgroundColor: '#3A8DFA' }}
      action={() => (props.type === 'signin' ? _signIn(props) : _signUp(props))}
    />
  );
};
export default FBLoginButton;
