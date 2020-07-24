import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  CheckBox,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Switch,
  Alert,
} from 'react-native';
import { InputText, Button } from '../atoms';
import { MUTATIONS } from '../apollo';
import { useMutation } from '@apollo/react-hooks';
import { storePin } from '../utils/JWT';

const FormCreatePin = props => {
  console.log(props.route.params);
  const [isSelected, setSelected] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [valuePin, setValuePin] = useState('');
  const [confirmValuePin, setConfirmValuePin] = useState('');
  const { email, name, password, platform, type } = props.route.params;
  const [signup] = useMutation(MUTATIONS.SIGNUP);
  const [login] = useMutation(MUTATIONS.LOGIN);

  useEffect(() => {
    setDisabled(!(valuePin !== '' && confirmValuePin !== '' && isSelected));
  });

  const handleSave = () => {
    try {
      if (valuePin === confirmValuePin) {
        storePin(valuePin, async token => {
          console.log('es el token====>', token);
          const { data } = await signup({
            variables: {
              email: email,
              name: name,
              password: password,
              platform: platform,
              type: type,
              pin: token,
            },
          });
          const { success } = data.signup;
          if (success) {
            const { data } = await login({
              variables: {
                email: email,
                password: password,
                platform: platform,
                type: type,
              },
            });
            const { success } = data.login;
            if (success) {
              return props.navigation.navigate('Drawer');
            } else {
              return Alert.alert(
                'Warning!',
                'An unexpected error occurred while starting session',
              );
            }
          } else {
            return Alert.alert(
              'Warning!',
              'An unexpected error occurred while registering the user',
            );
          }
        });
      } else {
        return Alert.alert('Warning!', 'The pin does not match');
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <View style={styles.secction_logo}>
          <Image
            style={styles.logo}
            source={require('../../assets/logoKSMNoText.png')}
          />
        </View>
        <View style={styles.secction_body}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>Please create your PIN code</Text>
            <View style={{ marginHorizontal: 20 }}>
              <InputText
                name="Ping"
                keyboardType="numeric"
                placeholder="6 digit-PIN"
                onChangeText={setValuePin}
                stylect={styles.inputStyle}
              />
              <InputText
                name="PingConfirm"
                keyboardType="numeric"
                placeholder="Confirm 6 digit-PIN"
                onChangeText={setConfirmValuePin}
                stylect={styles.inputStyle}
              />
              <View style={styles.card}>
                <Text style={styles.textCard}>
                  WARNING: Make sure to write down your pin and keep it in a
                  safe place, if you reinstall the application or delete your
                  phone cache you will be asked to enter your pin again. We
                  don’t store your pin, and we’ll not be able to restore it in
                  case you forget it, only you are able to unlock and decrypt
                  your wallet.
                </Text>
              </View>

              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                {Platform.OS === 'android' ? (
                  <CheckBox
                    value={isSelected}
                    onValueChange={setSelected}
                    style={styles.checkbox}
                    tintColors={{ true: 'white', false: 'white' }}
                  />
                ) : <Switch value={isSelected} onValueChange={setSelected} />}
                <Text style={styles.label}>
                  I confirm that I kept my pin in a safe place
                </Text>
              </View>
              <Button
                label="Create PIN"
                stylect={!disabled ? styles.button : styles.buttonDisable}
                action={() => handleSave()}
                disabled={disabled}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 20,
  },
  secction_logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20%',
  },
  secction_body: {
    width: '100%',
    height: '80%',
  },
  card: {
    marginVertical: 30,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#cc5741',
    borderRadius: 20,
  },
  textCard: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
    margin: 10,
    color: 'white',
  },
  checkbox: {
    alignSelf: 'center',
    borderColor: 'white',
  },
  label: {
    margin: 8,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#DB5A3A',
    marginTop: '5%',
  },
  buttonDisable: {
    backgroundColor: '#e09a8d',
    marginTop: '5%',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: 'white',
    marginTop: '5%',
  },
  inputStyle: {
    fontStyle: 'normal',
    fontSize: 15,
  },
});

export default FormCreatePin;
