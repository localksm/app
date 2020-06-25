import React from 'react';
import {
  View,
  Text,
  Clipboard,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-root-toast';

const email = 'support@localksm.com';

const copyEmail = () => {
  Toast.show('Copied Email!', { backgroundColor: 'white', textColor: 'black' });
  Clipboard.setString(email);
};

const HelpView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        If you have any problems please send us an email to
      </Text>
      <TouchableOpacity onPress={() => copyEmail()}>
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
