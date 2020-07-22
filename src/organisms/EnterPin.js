import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { CodeInput } from '../molecules';
import { Button } from '../atoms';

const EnterPin = (props) => {
    const [disabled, setDisabled] = useState(true);
    const [pinCode, setPinCode] = useState('');
    useEffect(() => {  
        console.log(pinCode);      
        setDisabled(!(pinCode.length == 6));
    });

    return (
        
        <View>
          <View style={styles.secction_logo}>
            <Image
              style={styles.logo}
              source={require('../../assets/logoKSMNoText.png')}
            />
          </View>
          <View style={styles.secction_body}>
          <View style={ styles.containerBody}>
            <Text style={styles.title}>Enter your PIN code</Text>
            <View style={styles.container_codeInput}>
                <CodeInput  codeLength={6} onCodeChange={ setPinCode } />
            </View>
            <Button
              label="Accept"
              stylect={!disabled ? styles.button : styles.buttonDisable}
              action={()=> alert("Hola")}
              disabled={disabled}
            />
          </View>
          </View>
        </View>
        
      );
}

const styles = StyleSheet.create({
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain'
    },
    secction_logo: {      
      alignItems: 'center',
      justifyContent:'flex-end',      
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
    containerBody:{
        flex: 1,        
        alignItems: 'center',
        justifyContent:'center',
        marginHorizontal: 20
    },
    container_codeInput:{
        marginVertical: 30
    },
    button: {
        backgroundColor: '#DB5A3A',
        marginTop: '40%',
        width:'100%'
    },
    buttonDisable: {
        backgroundColor: '#e09a8d',
        marginTop: '40%',
        width:'100%'
    },
  });

export default EnterPin;
