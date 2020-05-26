import React from 'react';
import { View } from 'react-native';
import { FormSignUp } from '../organisms';
import { styleBackground } from '../utils/styles';

const SignUp = () => {
  return (
    <View style={styleBackground.container}>
      <FormSignUp />
    </View>
  );
};

export default SignUp;
