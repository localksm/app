/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WalletContent } from '../molecules';
import { setSessionId } from '../utils/hooks';

const WalletView = () => {
  const [id, setId] = React.useState(null);

  React.useEffect(() => {
    setSessionId(setId);
  }, [setSessionId]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Address</Text>
      {id !== null ? (
        <WalletContent
          id={id}
          imageStyle={styles.image}
          textKeyStyle={styles.textKey}
          textCopyStyle={styles.textCopy}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  textKey: {
    paddingHorizontal: '10%',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  textCopy: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  image: {
    paddingTop: '10%',
    paddingBottom: '5%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default WalletView;
