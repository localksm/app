import React from 'react';
import { Text, View, } from 'react-native';
import { QUERIES, client, getSession } from '../apollo';
import { QrWallet, Link } from '../atoms';
import { getPin } from '../utils/JWT';
import { copy } from '../utils/misc';

const WalletContent = ({ imageStyle, textKeyStyle, textCopyStyle }) => {
  const [address, setAddress] = React.useState('Address');

  React.useEffect(() => {
    set();
  }, [set]);

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

  return (
    <>
      <View style={imageStyle}>
        <QrWallet value={address} />
      </View>
      <Text style={textKeyStyle}>{address}</Text>
      <View style={imageStyle}>
        <Link label="Copy Address" style={textCopyStyle} action={() => copy(address)} />
      </View>
    </>
  );
};
export default WalletContent;
