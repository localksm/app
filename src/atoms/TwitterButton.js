import React, { useState } from 'react';
import {
  NativeModules,
  StyleSheet,
  Alert,
  View,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Button from './Button';
import { sessionModel as session, twitterConfig } from '../utils/config';
import { client, setSession, MUTATIONS, QUERIES } from '../apollo';

const { RNTwitterSignIn } = NativeModules;

const TWLoginButton = props => {
  const [loading, setloading] = useState(false);

  const mapUser = data => {
    session['id'] = data.id;
    session['token'] = data.token;
    session['email'] = data.email;
    session['name'] = data.name;
    session['sessionType'] = 'twitter';
    session['__typename'] = data.__typename;

    return session;
  };

  const validateEmail = async (email, name) => {
    const response = await client.query({
      query: QUERIES.VERIFY_USER,
      variables: {
        email: email,
        name: name,
      },
    });
    const { emailExists, nameExists } = await response.data.verifyUser;
    return { emailExists, nameExists };
  };

  const signupTwitter = async (
    email,
    name,
    authToken,
    authTokenSecret,
    userID,
  ) => {
    const response = await client.mutate({
      mutation: MUTATIONS.SIGNUP,
      variables: {
        name: name,
        email: email ? email : 'null',
        type: 'twitter',
        token: authToken,
        authTokenSecret: authTokenSecret,
        userTWID: userID,
        platform: Platform.OS === 'ios' ? 'ios' : 'android',
      },
    });

    const { success } = response.data.signup !== null && response.data.signup;
    return { success };
  };

  const loginTwitter = async (
    email,
    name,
    authToken,
    authTokenSecret,
    userID,
  ) => {
    const response = await client.mutate({
      mutation: MUTATIONS.LOGIN,
      variables: {
        name: name,
        email: email ? email : 'null',
        type: 'twitter',
        token: authToken,
        authTokenSecret: authTokenSecret,
        userTWID: userID,
        platform: Platform.OS === 'ios' ? 'ios' : 'android',
      },
    });
    const { login } = response.data !== null && response.data;
    return { login };
  };

  const signIn = async () => {
    setloading(true);
    RNTwitterSignIn.init(
      twitterConfig.consumer_key,
      twitterConfig.consumer_secret,
    );
    const twData = await RNTwitterSignIn.logIn();

    try {
      const { email, authToken, authTokenSecret, userID, name } = twData;
      const { emailExists, nameExists } = await validateEmail(email, name);

      if (emailExists && nameExists) {
        const { login } = await loginTwitter(
          email,
          name,
          authToken,
          authTokenSecret,
          userID,
        );
        const session = mapUser(login);
        setSession({ session });
        setloading(false);
        return props.actionLogin();
      } else {
        const { success } = await signupTwitter(
          email,
          name,
          authToken,
          authTokenSecret,
          userID,
        );
        if (success) {
          const { login } = await loginTwitter(
            email,
            name,
            authToken,
            authTokenSecret,
            userID,
          );
          const session = mapUser(login);
          setSession({ session });
          setloading(false);
          return props.actionLogin();
        }
      }
    } catch (e) {
      setloading(false);
      Alert.alert('Warning!', 'Login failed, contact support');
      throw new Error(e);
    }
  };

  return (
    <View>
      {!loading ? (
        <Button
          label="login With Twitter"
          action={signIn}
          stylect={{ backgroundColor: '#58C5FA' }}
        />
      ) : (
        <View style={styles.text}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.text}>Please wait...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    width: 300,
    flex: 1,
    maxHeight: 50,
    marginTop: 10,
    backgroundColor: '#00acee',
  },
  text: {
    alignItems: 'center',
    color: 'white',
  },
});

export default TWLoginButton;