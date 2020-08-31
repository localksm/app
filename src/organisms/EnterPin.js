import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import PinView from 'react-native-pin-view';
import { Button, InputLayout } from '../atoms';
import FormValidator from '../utils/validator';
import { PinFormValidations } from '../utils/validations';
import { storePin, removePin } from '../utils/JWT';
import { getSession, client, QUERIES } from '../apollo';
import { useDisabled, useShowRemoveButton, useSetErrors } from '../utils/hooks';
import { savePin } from '../utils/misc';
const EnterPin = (props) => {
  const pinView = useRef(null);
  const { errors, setErrors } = useSetErrors();
  const { disabled, setDisabled } = useDisabled();
  const [pinCode, setPinCode] = useState('');
  const { showRemoveButton, setShowRemoveButton } = useShowRemoveButton();
  return (
    <View style={props.stylect}>
      <View style={styles.secction_logo}>
        <Image
          style={styles.logo}
          source={require('../../assets/logoKSMNoText.png')}
        />
      </View>
      <View style={styles.secction_body}>
        <View style={styles.containerBody}>
          <Text style={styles.title}>Enter your PIN code</Text>
          <InputLayout element="pin" resultValidator={errors}>
            <PinView
              inputSize={30}
              pinLength={6}
              ref={pinView}
              onValueChange={(value) => {
                setPinCode(value);
                setDisabled(!(value.length === 6));
                setShowRemoveButton(value.length > 0);
              }}
              inputAreaStyle={{
                marginBottom: 24,
              }}
              inputViewEmptyStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              inputViewFilledStyle={{
                backgroundColor: '#FFF',
              }}
              buttonViewStyle={{
                borderWidth: 1,
                borderColor: '#FFF',
              }}
              buttonTextStyle={{
                color: '#FFF',
              }}
              customLeftButton={
                showRemoveButton ? (
                  <TouchableWithoutFeedback
                    testID="remove-pin-btn"
                    onPress={() => pinView.current.clear()}>
                    <Image
                      style={styles.inputIco}
                      source={require('../../assets/remove.png')}
                    />
                  </TouchableWithoutFeedback>
                ) : undefined
              }
            />
          </InputLayout>
          <Button
            label="Accept"
            stylect={!disabled ? styles.button : styles.buttonDisable}
            action={() => savePin(pinCode, setErrors, props, pinView)}
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
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: '10%',
  },
  button: {
    backgroundColor: '#DB5A3A',
    marginTop: '6%',
    width: '100%',
  },
  buttonDisable: {
    backgroundColor: '#e09a8d',
    marginTop: '6%',
    width: '100%',
  },
});
export default EnterPin;
