import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Button from './Button';
import { useTwitterButton } from '.';


const TWLoginButton = (props) => {
  const { loading, signIn } = useTwitterButton(props);

  return (
    <View>
      {!loading ? (
        <Button
          label="Login with Twitter"
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
