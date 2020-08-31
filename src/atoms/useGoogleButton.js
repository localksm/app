import React, { useState } from 'react';
import { Platform } from 'react-native';
import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-community/google-signin';
import { googleConfig } from '../utils/config';
import { client, MUTATIONS, setSession } from '../apollo';
import { getPin } from '../utils/JWT';
import { mapDataSession } from '../utils/hooks';
import { useSignIn } from '.';

const UseGoogleButton = props => {

  const { verifyPin,verifyUser } = useSignIn();
  const [loading, setLoading] = useState(false);

  const configureGoogleSignIn = async () => {
    GoogleSignin.configure({
      webClientId: googleConfig.webClientId,
      offlineAccess: false,
    });
  };

  const loginGoogle = async (email, idToken) => {
    const response = await client.mutate({
      mutation: MUTATIONS.LOGIN,
      variables: {
        email: email,
        token: idToken,
        type: 'google',
        platform: Platform.OS === 'ios' ? 'ios' : 'android',
      },
    });
    const { login } = response.data !== null && response.data;
    return { login };
  };

  const signup = async () => {
    setLoading(true);
    try {
      const pin = await getPin();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { email } = userInfo.user;
      const { idToken } = userInfo;
      const { emailExists } = await verifyUser(email);

      // If email exists then login user normally
      if (emailExists) {
        const { login } = await loginGoogle(email, idToken);
        const session = mapDataSession(login, 'google');
        setSession({ session });
        setLoading(false);
        if (pin === null || pin === '') {
          setLoading(false);
          props.actionPin(true);
          return;
        }
        const { isValid } = await verifyPin(session.id, pin);
        if (!isValid) {
          return props.actionPin(true);
        }

        return props.actionLogin();
      } else {
        // If not then navigate to the CreatePin screen passing the payload to signup
        props.navigation.navigate('CreatePin', {
          payload: {
            name: email,
            email: email,
            token: idToken,
            type: 'google',
            platform: Platform.OS === 'ios' ? 'ios' : 'android',
          },
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('You canceled the login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        alert('In progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play services not available or outdated');
        // play services not available or outdated
      } else {
        alert('Something went wrong ' + error);
      }
    }
  };

  return { loading, configureGoogleSignIn, signup };
};

export default UseGoogleButton;
