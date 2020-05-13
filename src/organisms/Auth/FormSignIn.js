import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputText, Button, Link } from '../../atoms';

const FormSignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <InputText
        name="email"
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={value => setEmail(value)}
      />
      <InputText
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={value => setPassword(value)}
      />

      <TouchableOpacity>
        <Text style={styles.textForgot}>Forgot password?</Text>
      </TouchableOpacity>
      <Button label="Login" action={() => {}} />
      <View style={styles.styleLink}>
        <Link
          label="New user? Register"
          action={() => navigation.navigate('SingUp')}
          color="#ffffff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '30%',
    paddingHorizontal: '5%',
  },
  textForgot: {
    color: '#ffffff',
    marginTop: 10,
    paddingRight: 10,
    alignSelf: 'flex-end',
    fontSize: 14,
  },
  styleLink: {
    alignItems: 'center',
  },
});

export default FormSignIn;
