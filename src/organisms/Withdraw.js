import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { InputText, SendWithdrawButton } from '../atoms';
import { withContext } from '../apollo';
import { WithdrawText } from '../molecules';
import { setAddressAndBalance } from '../utils/misc';

const Withdraw = () => {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState('');
  const [total, setTotalBalance] = useState(0);
  const [free, setFreeBalance] = React.useState(0);
  const [show, showBalance] = useState(false);
  const [id, setId] = useState(null);
  const variables = {
    amount: parseFloat(amount),
    address: address,
    total: parseFloat(total),
    id: id,
  };
  useEffect(() => {
    setAddressAndBalance(setId, setFreeBalance, setTotalBalance, showBalance);
  }, []);

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <WithdrawText show={show} styles={styles} total={total} />
          <View style={styles.input}>
            <InputText
              testID="test-change-amount"
              placeholder="Amount"
              keyboardType="numeric"
              onChangeText={(value) => setAmount(value)}
            />
            <InputText
              testID="test-change-address"
              placeholder="Enter address"
              onChangeText={(value) => setAddress(value)}
              noReturn
            />
          </View>
          <SendWithdrawButton
            variables={variables}
            label="Submit"
            stylect={styles.button}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  balance: {
    alignItems: 'center',
    marginBottom: '10%',
  },
  input: {
    marginHorizontal: '10%',
    marginBottom: '20%',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  button: {
    backgroundColor: '#DB5A3A',
    marginHorizontal: '10%',
  },
});

export default withContext(Withdraw);
