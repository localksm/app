import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { useButtonSignUp } from '.';

const ButtonSignUp = (props) => {
  const { loading, SignUpWithEmail } = useButtonSignUp(props);

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
