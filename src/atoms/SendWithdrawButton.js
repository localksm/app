import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import Button from './Button';
import { MUTATIONS } from '../apollo';
import { validateAddress } from '../utils/ksm';


const SendWithdrawButton = props => {
  const { address, amount, id, total } = props.variables;
  const withdraw = useMutation(MUTATIONS.WITHDRAW);
  const [load, setLoad] = useState(false);
  
  const send = async () => {
    setLoad(true);
    try {
      const {data} = await withdraw[0]({
        variables: { senderId: id, to: address, amount: amount },
      });
      const {success} = data.withdraw;
      if(success){
        setLoad(false)
        return Alert.alert('Success!','Withdraw send');
      }
    } catch (error) {
      setLoad(false)
      Alert.alert('Warning!','Unexpected error');
      throw new Error(error)
    }
   
  };

  const sendWithdraw = async () => {
    setLoad(true);
    try {
      if (total === 0) {
        setLoad(false);
        return Alert.alert('Warning!', 'Not enough balance');
      }
      if (amount === 0 || amount === '') {
        setLoad(false);
        return Alert.alert(
          'Warning!',
          'Quantity cannot be empty or equal to zero',
        );
      }
      if (address === '') {
        setLoad(false);
        return Alert.alert('Warning!', 'The address cannot be empty');
      } else {
        const isValidAddress = validateAddress(address);
        if (isValidAddress) {
          Alert.alert(
            'Valid Address',
            `Please verify this is the correct address before sending:\n ${address}`,
            [
              { text: 'Try again?', onPress: () => setLoad(false)},
              {
                text: "Yeah that's right",
                onPress: async () => {
                 await send()
                },
              },
            ],
          );
        } else {
          Alert.alert(
            'Warning!',
            'This seems to be an invalid kusama address. Kusama addresses always start with a capital letter like C, D, F, G, H, J...',
          );
        }
      }
    } catch (error) {
      setLoad(false);
      Alert.alert('Warning', `Invalid decoded address`);
      throw new Error(error);
    }
  };
  return !load ? (
    <View>
      <Button
        label={props.label}
        stylect={props.stylect}
        action={sendWithdraw}
      />
    </View>
  ) : (
    <View style={styles.text}>
      <ActivityIndicator size="small" color="white" />
      <Text style={styles.text}>Please wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    color: 'white',
  },
});

export default SendWithdrawButton;
