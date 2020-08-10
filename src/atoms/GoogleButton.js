import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { useNavigation } from '@react-navigation/native';
import { sessionModel, googleConfig } from '../utils/config';
import { client, MUTATIONS, QUERIES, setSession } from '../apollo';
import Button from './Button';
import { getPin } from '../utils/JWT';

const GoogleButton = props => {
  const navigation = useNavigation();
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

  const verifyPin = async (id, pin) => {
    const response = await client.query({
      query: QUERIES.VERIFY_PIN,
      variables: { id: id, pin: pin },
    });

    const { isValid } = response.data.validatePin;
    return { isValid };
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
        const session = mapUser(login);
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
        navigation.navigate('CreatePin', {
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

  return (
    <View>
      {!loading ? (
        <Button label={props.label} action={signup} stylect={props.stylect} />
      ) : (
        <View style={styles.text}>
          <ActivityIndicator size="small" color="white" />
          <Text style={styles.text}>Please wait...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    color: 'white',
  },
});

export default GoogleButton;
