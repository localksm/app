import React from 'react';
import { Text } from 'react-native';
import getBalance from '../utils/ksm';
import { QUERIES, client } from '../apollo';

function Balance(props) {
  const [balance, setBalance] = React.useState(0);

  React.useEffect(() => {
    set();
  }, []);

  async function set() {
    try {
      const res = await client.query({
        query: QUERIES.PUBLIC_KEY,
        variables: { id: props.id },
      });
      const address = res.data.publicKeys.ksm;
      const balance = await getBalance(address);

      setBalance(() => balance.toString());
    } catch (e) {
      throw new Error(e);
    }
  }

  return <Text style={props.style}>{balance} KSM</Text>;
}

export default Balance;
