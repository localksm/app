import React from 'react';
import { View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';
import { useSetSelect } from '../utils/hooks';
import { WalletSwitch, WalletViewButton } from '../molecules';

const Wallet = props => {
  const [select, setSelect] = useState(false);
  backHandlerControl(props);
  const { select, setSelect } = useSetSelect();

  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <View style={styles.buttons}>
          <WalletViewButton
            select={select}
            handleSelect={setSelect}
          />
        </View>
        <View style={styles.elements}>
          <WalletSwitch select={select} />
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
  elements: {
    marginTop: '5%',
    height: hp('90%'),
    minHeight: hp('90%'),
  }
});

export default Wallet;
