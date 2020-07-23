import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { InputText, SendWithdrawButton } from '../atoms';
import { getBalance } from '../utils/ksm';
import { QUERIES, client, withContext, getSession } from '../apollo';
import { getPin } from '../utils/JWT';

const Withdraw = () => {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState('');
  const [total, setTotalBalance] = useState(0);
  const [free, setFreeBalance] = React.useState(0);
  const [show, showBalance] = useState(false);
  const [id, setId] = useState(null)
  const variables = {
    amount: parseFloat(amount),
    address: address,
    total: parseFloat(total),
    id: id,
  }
  useEffect(() => {
    set();
  }, []);

  async function set() {
    const pin = await getPin()
    const { session } = await getSession();
    setId(session.id)

    try {
      const res = await client.query({
        query: QUERIES.PUBLIC_KEY,
        variables: { id: session.id, pin },
      });
      const address = res.data.publicKeys.ksm;
      await getBalance(address, setResponse);
    } catch (e) {
      throw new Error(e);
    }
  }

  function setResponse(freeBalance, totalBalance) {
    setFreeBalance(() => freeBalance.toString());
    setTotalBalance(() => totalBalance.toString());
    showBalance(true);
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.balance}>
            <Text style={styles.text}>Current Balance</Text>
            {!show ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.text}>{total} KSM</Text>
            )}
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
