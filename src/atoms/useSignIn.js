import React, { useState } from 'react';
import { client, QUERIES, MUTATIONS, setSession } from '../apollo';
import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { checkValueSignin, mapDataSession } from '../utils/hooks';
import { getPayloadLogin } from '../utils/misc';

const useSignIn = (props) => {
  const [load, setLoad] = useState(false);
  const loginWithEmail = useMutation(MUTATIONS.LOGIN);
  const navigation = useNavigation();
  
  const verifyPin = async (id, pin) => {
    const response = await client.query({
      query: QUERIES.VERIFY_PIN,
      variables: { id: id, pin: pin },
    });

    const { isValid } = response.data.validatePin;
    return { isValid };
  };

  const verifyUser = async (email) => {
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
    setLoad(true);
    const { email, password, pin } = props.variables;
    const { emailExists } = await verifyUser(email);
    
    try {
      
      const{isValid, message}= await checkValueSignin( 
        email, 
        password,
        props.actionErrorEmail,
        props.actionErrorPass );
      if (!isValid) {
        setLoad(false);
        return Alert.alert('Warning!', message);
      }
      
      if (emailExists) {
        const { data } = await loginWithEmail[0]({ variables: getPayloadLogin(props.variables) });
        const { id } = data.login;
        const session = mapDataSession(data.login, 'email');
        setSession({ session });
        setLoad(false);
           
        // Check for pin before verifying and after setting session
        if (pin === null || pin === '') {
          setLoad(false);
          props.actionPin(true);
          return;
        }

        const { isValid } = await verifyPin(id, pin);
        if (!isValid) {
          return props.actionPin(true);
        } else {
          return props.actionLogin();
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



  return { load, setLoad, verifyPin, verifyUser, SignUpWithEmail };
};

export default useSignIn;
