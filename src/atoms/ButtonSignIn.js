import React, { useState } from 'react';
import { Alert, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import validator from 'validator';
import Button from './Button';
import { sessionModel } from '../utils/config';
import { client, MUTATIONS, QUERIES, setSession } from '../apollo';
import { fetchBalacnce } from '../utils/ksm';

const ButtonSignIn = props => {
  const [load, setLoad] = useState(false);
  const [loginWithEmail] = useMutation(MUTATIONS.LOGIN);
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

  const verifyPin = async (id, pin) => {
    const response = await client.query({
      query: QUERIES.VERIFY_PIN,
      variables: { id: id, pin: pin },
    });

    const { isValid } = response.data.validatePin;
    return { isValid };
  };

  const SignUpWithEmail = async () => {
    setLoad(true);
    const { email, password, pin } = props.variables;
    const { emailExists } = await verifyUser(email);

    const payloadLogin = {
      email: email,
      password: password,
      type: 'email',
      platform: Platform.OS === 'ios' ? 'ios' : 'android',
    };

    try {
      if (email === '') {
        setLoad(false);
        props.actionErrorEmail();
        return Alert.alert('Warning!', 'Email is required');
      }
      if (password === '') {
        setLoad(false);
        props.actionErrorPass();
        return Alert.alert('Warning!', 'Password is required');
      }
      
      if (pin === null || pin === '') {
        setLoad(false);
        props.actionPin();
        return;
      }

      if (!validator.isEmail(email)) {
        setLoad(false);
        props.actionErrorEmail();
        return Alert.alert('Warning!', 'Enter a valid email');
      }
      if (!validator.isInt(password, { min: 10 })) {
        setLoad(false);
        props.actionErrorPass();
        return Alert.alert(
          'Warning!',
          'The password must contain at least 10 alphanumeric characters',
        );
      }
      if (emailExists) {
        const { data } = await loginWithEmail({ variables: payloadLogin });
        const { id } = data.login;
        const session = mapUser(data.login);
        setSession({ session });
        setLoad(false);
        fetchBalacnce();
        const { isValid } = await verifyPin(id, pin);
        if (!isValid) {
          return props.actionPin();
        } else {
          return props.actionSignIn();
        }
      } else {
        setLoad(false);
        return Alert.alert('Warning!', 'The email is not registered', [
          {
            text: 'You want to register?',
            onPress: () => navigation.navigate('SignUp'),
          },
          { text: 'Try again?' },
        ]);
      }
    } catch (error) {
      setLoad(false);
      throw new Error(error);
    }
  };

  return (
    <View>
      {!load ? (
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

export default ButtonSignIn;
