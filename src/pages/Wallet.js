import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { WalletView, HomeLayout, Withdraw } from '../organisms';
import { styleBackground } from '../utils/styles';
import { Button } from '../atoms';
import { backHandlerControl } from '../utils/backHandlerControl';

const Wallet = props => {
  const [select, setSelect] = useState(false);
  backHandlerControl(props);
  const {select, setSelect} = useSetSelect();

  const handleSelect = () => setSelect(prev => !prev)

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
            action={handleSelect}
          />
          <Button
            label="Withdraw"
            stylect={{
              ...styles.deposit,
              backgroundColor: select ? 'white' : null,
            }}
            stylectLabel={{ color: select ? '#DB5A3A' : 'white' }}
            action={handleSelect}
          />
        </View>
        <View style={ styles.elements}>
          <ScrollView>
            {!select ? <WalletView />: <Withdraw />}
          </ScrollView>
        </View>
      </View>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: hp('10%'),
    minHeight: hp('10%'),
    alignItems:'center',
  },
  deposit: {
    borderWidth: 1,
    borderColor: 'white',
    width: 150,
    marginRight: 10,
    marginLeft: 10,
  },
  elements:{
    marginTop:'5%',
    height: hp('90%'),
    minHeight: hp('90%'),
  }
});

export default Wallet;
