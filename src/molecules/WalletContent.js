import React from 'react';
import { Text, View, ActivityIndicator, Clipboard } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Toast from 'react-native-root-toast';
import { QUERIES } from '../apollo';
import { QrWallet, Link } from '../atoms';

const WalletContent = ({ id, imageStyle, textKeyStyle, textCopyStyle }) => {
  const { loading, error, data } = useQuery(QUERIES.PUBLIC_KEY, {
    variables: { id },
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error while loading your address</Text>;

  const copy = () => {
    Toast.show('Copied Address!', {backgroundColor: 'white', textColor: 'black'});
    Clipboard.setString(data.publicKeys.ksm);
  };

  return (
    <>
      <View style={imageStyle}>
        <QrWallet value={data.publicKeys.ksm} />
      </View>
      <Text style={textKeyStyle}>{data.publicKeys.ksm}</Text>
      <View style={imageStyle}>
        <Link label='Copy Address' style={textCopyStyle} action={copy}/>
      </View>
    </>
  );
};
export default WalletContent;
