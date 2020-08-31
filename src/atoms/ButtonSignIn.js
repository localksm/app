import React from 'react';
import {  View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { useSignIn } from '.';

function ButtonSignIn (props) {
  const { load, SignUpWithEmail } = useSignIn(props);  

  
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
