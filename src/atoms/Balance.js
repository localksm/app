import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { getBalances } from '../utils/ksm';
import { QUERIES } from '../apollo';

function Balance(props) {
  const [balance, setBalance] = React.useState(0);
  const { loading, error, data } = useQuery(QUERIES.PUBLIC_KEY, {
    variables: { id: props.id },
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>There was an error</Text>;

  React.useEffect(() => {
    set();
  }, []);

  async function set() {
    const address = data.publicKeys.ksm;
    const balance = await getBalances(address);
    setBalance(()=>balance.free.toString());
  }
  
  return <Text style={props.style}>{balance} KSM</Text>;
}

export default Balance;
