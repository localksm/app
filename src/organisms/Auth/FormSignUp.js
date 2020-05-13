import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputText, Button } from '../../atoms';

const FormSignUp = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <InputText
        name="username"
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={value => setUsername(value)}
      />
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
      <InputText
        name="confirmPassword"
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={value => setConfirmPassword(value)}
      />

      <Button label="Register" action={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '30%',
    paddingHorizontal: '5%',
  },
});

export default FormSignUp;
