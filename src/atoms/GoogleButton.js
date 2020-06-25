import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { sessionModel, googleConfig } from '../utils/config';
import { Button } from './Button';
import { client, MUTATIONS, QUERIES, setSession } from '../apollo';

const GoogleButton = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const configureGoogleSignIn = async () => {
    GoogleSignin.configure({
      webClientId: googleConfig.webClientId,
      offlineAccess: false,
    });
  };

  const mapUser = data => {
    sessionModel['token'] = data.token;
    sessionModel['id'] = data.id;
    sessionModel['name'] = data.email;
    sessionModel['email'] = data.email;
    sessionModel['sessionType'] = 'google';
    sessionModel['__typename'] = 'session';

    return sessionModel;
  };

  const verifyUser = async email => {
    const res = await client.query({
      query: QUERIES.VERIFY_USER,
      variables: {
        email: email,
      },
    });
    const { emailExists } = res.data.verifyUser;
    return { emailExists };
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

  const signupGoogle = async (email, idToken) => {
    const response = await client.mutate({
      mutation: MUTATIONS.SIGNUP,
      variables: {
        name: email,
        email: email,
        token: idToken,
        type: 'google',
        platform: Platform.OS === 'ios' ? 'ios' : 'android',
      },
    });

    const { success } = response.data.signup !== null && response.data.signup;
    return { success };
  };

  const signup = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { email } = userInfo.user;
      const { idToken } = userInfo;
      const { emailExists } = await verifyUser(email);
      if (emailExists) {
        const { login } = await loginGoogle(email, idToken);
        const session = mapUser(login);
        setSession({ session });
        return props.actionLogin();
      } else {
        const { success } = await signupGoogle(email, idToken);
        if (success) {
          const { login } = await loginGoogle(email, idToken);
          const session = mapUser(login);
          setSession({ session });
          return props.actionLogin();
        }
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

  return (
    <View>
      {!loading ? (
        <Button label={props.label} action={signup} stylect={props.stylect} />
       ) : (
         <View style={styles.text}>
           <ActivityIndicator size='small' color="white" />
           <Text style={styles.text}>Please wait...</Text>
         </View>
       )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    color: 'white'
  },
});

export default GoogleButton;
