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

  React.useEffect(() => {
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setSession(session);
  }

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.textBalance, paddingBottom: '5%' }}>
        Balance
      </Text>
      {session !== null ? (
        <Balance
          id={session.id}
          style={{ ...styles.textBalance, fontSize: 20 }}
        />
      ) : (
        <ActivityIndicator />
      )}
      <Text style={{ ...styles.textBalance, fontSize: 14 }}>
        {' '}
        $0 USD{/* In offers user set the ksm value, but which is the reference for this? */}
      </Text>
    </View>
  );
}

export default BalanceHeader;
