import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { CodeInput } from '../molecules';
import { Button, InputLayout } from '../atoms';
import FormValidator from '../utils/validator';
import { PinFormValidations } from '../utils/validations';
import { storePin } from '../utils/JWT'
const EnterPin = props => {
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [pinCode, setPinCode] = useState('');

  const validateForm = variables => {
    const formValidator = new FormValidator(PinFormValidations);
    let validation = formValidator.validate(variables);
    return validation;
  };

  const savePin = () => {
    const validator = validateForm({
      pin: pinCode,
    });
    setErrors(validator);
    if (validator.isValid) {
      storePin(pinCode, props.action);
    }
  };

  return (
    <View>
      <View style={styles.secction_logo}>
        <Image
          style={styles.logo}
          source={require('../../assets/logoKSMNoText.png')}
        />
      </View>
      <View style={styles.secction_body}>
        <View style={styles.containerBody}>
          <Text style={styles.title}>Enter your PIN code</Text>
          <View style={styles.container_codeInput}>
            <InputLayout element="pin" resultValidator={errors}>
              <CodeInput
                codeLength={6}
                onCodeChange={value => {
                  setPinCode(value);
                  setDisabled(!(value.length === 6));
                }}
              />
            </InputLayout>
          </View>
          <Button
            label="Accept"
            stylect={!disabled ? styles.button : styles.buttonDisable}
            action={savePin}
            disabled={disabled}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  secction_logo: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '20%',
  },
  secction_body: {
    width: '100%',
    height: '80%',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: 'white',
    marginTop: '5%',
  },
  containerBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  container_codeInput: {
    marginVertical: 30,
  },
  button: {
    backgroundColor: '#DB5A3A',
    marginTop: '40%',
    width: '100%',
  },
  buttonDisable: {
    backgroundColor: '#e09a8d',
    marginTop: '40%',
    width: '100%',
  },
});

export default EnterPin;
