import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { InputText, Button } from '../atoms';
import Balance from '../atoms/Balance';
import { getSession } from '../apollo';

const Withdraw = () => {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState('');
  const [session, setSession] = useState(null);

  useEffect(() => {
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setSession(session.id);
  }
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.balance}>
            <Text style={styles.text}>Current Balance</Text>
            <Balance id={session} styleTotal={styles.text} isWithdraw />
          </View>
          <View style={styles.input}>
            <InputText
              placeholder="Amount"
              keyboardType="numeric"
              onChangeText={value => setAmount(value)}
            />
            <InputText
              placeholder="Enter address"
              onChangeText={value => setAddress(value)}
            />
          </View>
          <Button label="Submit" stylect={styles.button} action={() => {}} />
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

export default Withdraw;
