import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  CheckBox,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { InputText, Button, InputLayout } from '../atoms';
import FormValidator from '../utils/validator';
import { createPinValidations } from '../utils/validations';
import { MUTATIONS, setSession } from '../apollo';
import { storePin } from '../utils/JWT';
import { sessionModel } from '../utils/config';
import { fetchBalacnce } from '../utils/ksm';
import eye from '../../assets/eye.png';
import eyeOff from '../../assets/eye-off.png';

const FormCreatePin = (props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const signup = useMutation(MUTATIONS.SIGNUP);
  const login = useMutation(MUTATIONS.LOGIN);
  const [isSelected, setSelected] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [valuePin, setValuePin] = useState('');
  const [confirmPinValue, setConfirmPinValue] = useState('');
  const [secure, setSecure] = React.useState(true);
  const [secureConfirm, setSecureConfirm] = React.useState(true);

  useEffect(() => {
    setDisabled(!(valuePin !== '' && confirmPinValue !== '' && isSelected));
  });

  const validateForm = (variables) => {
    const formValidator = new FormValidator(createPinValidations);
    let validation = formValidator.validate(variables);

    if (validation.isValid) {
      validation = {
        pinConfirm: {
          isInvalid: valuePin !== confirmPinValue,
          message: 'The PIN confirmation does not match',
        },
        isValid: valuePin === confirmPinValue,
      };
    }

    return validation;
  };

  const mapUser = (data) => {
    sessionModel['token'] = data.token;
    sessionModel['id'] = data.id;
    sessionModel['name'] = data.name;
    sessionModel['email'] = data.email;
    sessionModel['sessionType'] = 'email';
    sessionModel['__typename'] = 'session';

    return sessionModel;
  };

  const handleSave = () => {
    const validator = validateForm({
      pin: valuePin,
      pinConfirm: confirmPinValue,
    });

    setErrors(validator);
    if (validator.isValid) {
      setLoading(true);
      try {
        storePin(valuePin, async (token) => {
          const { data } = await signup({
            variables: {
              ...props.route.params.payload,
              pin: token,
            },
          });
          const { success } = data.signup;
          if (success) {
            const { data } = await login({
              variables: {
                ...props.route.params.payload,
              },
            });
            const { success } = data.login;
            if (success) {
              const session = await mapUser(data.login);
              await setSession({ session });
              fetchBalacnce();
              return props.navigation.navigate('Drawer');
            } else {
              setLoading(false);
              return Alert.alert(
                'Warning!',
                'An unexpected error occurred while starting session',
              );
            }
          } else {
            setLoading(false);
            return Alert.alert(
              'Warning!',
              'An unexpected error occurred while registering the user',
            );
          }
        });
      } catch (error) {
        throw new Error(error);
      }
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
              <InputLayout element="pin" resultValidator={errors}>
                <View style={styles.groups}>
                  <InputText
                    name="Ping"
                    keyboardType="numeric"
                    placeholder="6 digit-PIN"
                    secureTextEntry={secure}
                    value={valuePin}
                    onChangeText={setValuePin}
                    maxLength={6}
                    stylect={styles.inputStyle}
                  />
                  <TouchableWithoutFeedback
                    testID="set-secure-btn1"
                    onPress={() => setSecure(!secure)}>
                    <Image
                      style={styles.inputIco}
                      source={secure ? eye : eyeOff}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </InputLayout>
              <InputLayout element="pinConfirm" resultValidator={errors}>
                <View style={styles.groups}>
                  <InputText
                    name="PingConfirm"
                    keyboardType="numeric"
                    placeholder="Confirm 6 digit-PIN"
                    secureTextEntry={secureConfirm}
                    value={confirmPinValue}
                    onChangeText={setConfirmPinValue}
                    stylect={styles.inputStyle}
                    maxLength={6}
                  />
                  <TouchableWithoutFeedback
                    testID="set-secure-btn2"
                    onPress={() => setSecureConfirm(!secureConfirm)}>
                    <Image
                      style={styles.inputIco}
                      source={secureConfirm ? eye : eyeOff}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </InputLayout>
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
                ) : (
                  <Switch value={isSelected} onValueChange={setSelected} />
                )}
                <Text style={styles.label}>
                  I confirm that I kept my pin in a safe place
                </Text>
              </View>
              {!loading ? (
                <Button
                  label="Create PIN"
                  stylect={!disabled ? styles.button : styles.buttonDisable}
                  action={handleSave}
                  disabled={disabled}
                />
              ) : (
                <View style={styles.text}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              )}
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
    width: '100%',
  },
  inputIco: {
    position: 'absolute',
    color: 'white',
    right: 0,
    top: '40%',
    maxWidth: 32,
    maxHeight: 32,
  },
  groups: {
    width: '100%',
    flexDirection: 'row',
  },
});

export default FormCreatePin;
