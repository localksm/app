import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Balance from '../atoms/Balance';
import { getSession } from '../apollo';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: '10%',
  },
  textBalance: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  offerList: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    paddingTop: '1%',
    paddingBottom: '80%',
    backgroundColor: 'white',
  },
});

function BalanceHeader() {
  const [session, setSession] = React.useState(null);
  const [show, showBalance] = React.useState(false);

  React.useEffect(() => {
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setSession(session);
  }

  return session !== null ? (
    <View style={styles.container}>
      <Text style={{ ...styles.textBalance}}>
        Balance
      </Text>
      <Balance
        id={session.id}
        styleTotal={{ ...styles.textBalance, fontSize: 20 }}
        styleFree={{ ...styles.textBalance, fontSize: 10 }}
        styleText={{ ...styles.textBalance, fontSize: 14 }}
      />
    </View>
  ) : (
    <ActivityIndicator />
  );
}

export default BalanceHeader;
