import React from 'react';
import { Text, View, ActivityIndicator, Clipboard } from 'react-native';
import Toast from 'react-native-root-toast';
import { QUERIES, client, getSession } from '../apollo';
import { QrWallet, Link } from '../atoms';
import { getPin } from '../utils/JWT';

const WalletContent = ({ id, imageStyle, textKeyStyle, textCopyStyle }) => {
  const [address, setAddress] = React.useState('Address');

  React.useEffect(() => {
    set();
  }, []);

  async function set() {
    const pin = await getPin();
    const { session } = await getSession();

    try {
      const res = await client.query({
        query: QUERIES.PUBLIC_KEY,
        variables: { id: session.id, pin },
      });

      const addressData = res.data.publicKeys.ksm;
      setAddress(addressData);
    } catch (e) {
      throw new Error(e);
    }
  }


  const copy = () => {
    Toast.show('Copied Address!', {
      backgroundColor: 'white',
      textColor: 'black',
    });
    Clipboard.setString('data.publicKeys.ksm');
  };

  return (
    <>
      <View style={imageStyle}>
        <QrWallet value={address} />
      </View>
      <Text style={textKeyStyle}>{address}</Text>
      <View style={imageStyle}>
        <Link label="Copy Address" style={textCopyStyle} action={copy} />
      </View>
    </>
  );
};
export default WalletContent;
