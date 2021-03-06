import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { InputText, Button } from '../atoms';

const FormSignUp = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return [
    <View key="logo" style={styles.secction_logo}>
    <Image
      style={styles.logo}
      source={require('../../assets/logoKSMNoText.png')}
    />
     </View>,
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
    <View style={ styles.button}>
      <Button label="Register" stylect={{ backgroundColor: '#DB5A3A' }} action={() => {}} />
    </View>

    </View>
  ];
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '10%',
    paddingHorizontal: '5%',
  },
  secction_logo: {
    paddingTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
  
    height: 100,
    resizeMode: 'contain',
  },
  button:{
    paddingTop: '10%',
  }
});

export default FormSignUp;
