import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { UseGoogleButton, Button } from '.';


const GoogleButton = props => {
  const navigation = useNavigation();
  const { loading, configureGoogleSignIn, signup }= UseGoogleButton({navigation, ...props });
  
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return (
    <View>
      {!loading ? (
        <Button label={props.label} action={signup} stylect={props.stylect} />
      ) : (
        <View style={styles.text}>
          <ActivityIndicator size="small" color="white" />
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

export default GoogleButton;
