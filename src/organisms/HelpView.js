import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { copyEmail, email } from '../utils/misc';

const HelpView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        If you have any problems please send us an email to
      </Text>
      <TouchableOpacity className="copy" onPress={copyEmail}>
        <Text style={styles.textVariable}>{email}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 200,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  textVariable: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 18,
    color: 'white',
  },
});

export default HelpView;
