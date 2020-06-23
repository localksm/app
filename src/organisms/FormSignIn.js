import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputText, Button, Link, FBLoginButton } from '../atoms';



const FormSignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return [
    <View key="logo" style={styles.secction_logo}>
      <Image
        style={styles.logo}
        source={require('../../assets/logoKSMNoText.png')}
      />
    </View>,
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
      <View style={styles.buttons}>
        <Button
          label="Login"
          stylect={{ backgroundColor: '#DB5A3A' }}
          action={() => navigation.navigate('Drawer')}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          label="Login with Google"
          stylect={{ backgroundColor: '#6BA3FA' }}
          action={() => navigation.navigate('Drawer')}
        />
      </View>
      <View style={styles.buttons}>       
        <FBLoginButton  
          actionLogin={ ()=> navigation.navigate('Drawer') } 
          type={"signin"} 
          /> 
      </View>
      <View style={styles.buttons}>
        <Button
          label="Login with Twitter"
          stylect={{ backgroundColor: '#58C5FA' }}
          action={() => navigation.navigate('Drawer')}
        />
      </View>

      <View style={styles.styleLink}>
        <Link
          label="New user? Register"
          action={() => navigation.navigate('SingUp')}
          color="#ffffff"
        />
      </View>
    </View>,
  ];
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '0%',
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
    paddingTop: '10%',
    alignItems: 'center',

  },
  secction_logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 20,
  },
  buttons: {
    paddingVertical: '20%',
    paddingTop: '3%',
    paddingBottom: '1%',
  },
});

export default FormSignIn;
