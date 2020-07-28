import AsyncStorage from '@react-native-community/async-storage';
import jwt from 'react-native-pure-jwt';
import { ENV_VARS } from './config';

export const storePin = (value, callback) => {
  try {
    jwt
      .sign(
        {
          pin: value,
          exp: new Date().getTime() + 360000 * 100000, // expiration date, required, in ms, absolute to 1/1/1970
        }, // body
        ENV_VARS.JWT_SECRET, // secret
        {
          alg: 'HS256',
        },
      )
      .then(async token => {
        await AsyncStorage.removeItem('pin'); // Remove any previous token before saving
        await AsyncStorage.setItem('pin', token);
        await callback(token);
      })
      .catch(error => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
};

export const getPin = async () => {
  const response = await AsyncStorage.getItem('pin');

  return response;
};

export const removePin = async () => {
  await AsyncStorage.removeItem('pin');
};
