import React, { useState } from 'react';
import { Alert, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import Button from './Button';
import { sessionModel } from '../utils/config';
import { client, MUTATIONS, QUERIES, setSession } from '../apollo';

const ButtonSignUp = props => {
  const [loading, setLoading] = useState(false);
  const [loginWithEmail] = useMutation(MUTATIONS.LOGIN);
  const [signupWithEmail] = useMutation(MUTATIONS.SIGNUP);
  const navigation = useNavigation();

  const mapUser = data => {
    sessionModel['token'] = data.token;
    sessionModel['id'] = data.id;
    sessionModel['name'] = data.name;
    sessionModel['email'] = data.email;
    sessionModel['sessionType'] = 'email';
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

  const SignUpWithEmail = async () => {
    setLoading(true);
    const { email, username, password, confirmPassword } = props.variables;
    const { emailExists } = await verifyUser(email);
    const payloadLogin = {
      email: email,
      password: password,
      type: 'email',
      platform: Platform.OS === 'ios' ? 'ios' : 'android',
    };
    const payloadSugnUp = {
      name: username,
      email: email,
      password: password,
      type: 'email',
      platform: Platform.OS === 'ios' ? 'ios' : 'android',
    };

    try {
      if (email === '') {
        setLoading(false);
        return Alert.alert('Warning!', 'Email is required');
      } else if (username === '') {
        setLoading(false);
        return Alert.alert('Warning!', 'Username is required');
      } else if (password === '' ) {
        setLoading(false);
        return Alert.alert('Warning!', 'Password is required');
      }else if (password.length < 10) {
        setLoading(false);
        return Alert.alert('Warning!', 'The password must contain at least 10 alphanumeric characters');
      } else if (confirmPassword === '') {
        setLoading(false);
        return Alert.alert('Warning!', 'Confirm Password is required');
      } else if (password !== confirmPassword) {
        setLoading(false);
        return Alert.alert('Warning!', 'Passwords do not match');
      }
      if (!emailExists) {
        const { data } = await signupWithEmail({ variables: payloadSugnUp });
        const { success } = data.signup;

        if (success) {
          const { data } = await loginWithEmail({ variables: payloadLogin });
          const session = mapUser(data.login);
          setSession({ session });
          return props.actionSignUp();
        }
      } else {
        setLoading(false);
        return Alert.alert('Warning!', 'The email is already registered', [
          {
            text: 'You want to login?',
            onPress: () => navigation.navigate('SignIn'),
          },
          { text: 'Try again?' },
        ]);
      }
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  return (
    <View>
      {!loading ? (
        <Button
          label={props.label}
          stylect={props.stylect}
          action={SignUpWithEmail}
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
  text: {
    alignItems: 'center',
    color: 'white',
  },
});

export default ButtonSignUp;