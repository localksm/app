import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WalletView, HomeLayout, Withdraw } from '../organisms';
import { styleBackground } from '../utils/styles';
import { Button } from '../atoms';
import { backHandlerControl } from '../utils/backHandlerControl';

const Wallet = props => {
  const [select, setSelect] = useState(false);
  backHandlerControl(props);
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <View style={styles.buttons}>
          <Button
            label="Deposit"
            stylect={{
              ...styles.deposit,
              backgroundColor: !select ? 'white' : null,
            }}
            stylectLabel={{ color: !select ? '#DB5A3A' : 'white' }}
            action={() => setSelect(false)}
          />
          <Button
            label="Withdraw"
            stylect={{
              ...styles.deposit,
              backgroundColor: select ? 'white' : null,
            }}
            stylectLabel={{ color: select ? '#DB5A3A' : 'white' }}
            action={() => setSelect(true)}
          />
        </View>
        {!select ? <WalletView />: <Withdraw />}
      </View>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '20%',
  },
  deposit: {
    borderWidth: 1,
    borderColor: 'white',
    width: 150,
    marginRight: 10,
    marginLeft: 10,
  },
});

export default Wallet;
