import React from 'react';
import { Text, View } from 'react-native';
import { QrWallet, Link } from '../atoms';
import { copy } from '../utils/misc';
import { setUserAddress } from '../utils/hooks';

const WalletContent = ({ imageStyle, textKeyStyle, textCopyStyle }) => {
  const [address, setAddress] = React.useState('Address');

  React.useEffect(() => {
    setUserAddress(setAddress);
  }, [setUserAddress]);

  return (
    <>
      <View style={imageStyle}>
        <QrWallet value={address} />
      </View>
      <Text style={textKeyStyle}>{address}</Text>
      <View style={imageStyle}>
        <Link
          label="Copy Address"
          style={textCopyStyle}
          action={() => copy(address)}
        />
      </View>
    </>
  );
};
export default WalletContent;
