import React from 'react';
import { View } from 'react-native';
import { FormSignIn } from '../organisms';
import { styleBackground } from '../utils/styles';

const SignIn = () => {
  return (
    <View style={styleBackground.container}>
      <FormSignIn />
    </View>
  );
};

export default SignIn;
