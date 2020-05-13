import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormSignUp } from '../../organisms/Auth';

const SignUp = () => {
  return (
    <View style={styles.container}>
      <FormSignUp />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
  },
});

export default SignUp;
