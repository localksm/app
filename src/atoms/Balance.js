import React from 'react';
import { Text  } from 'react-native';
import { getBalances } from '../utils/ksm';
import { QUERIES, client } from '../apollo';

function Balance(props) {
  const [balance, setBalance] = React.useState(0);

  React.useEffect(() => {
    set();
  }, []);

  async function set() {
    const res = await client.query(QUERIES.PUBLIC_KEY, {
      variables: { id: props.id },
    });
    const address = res.data.publicKeys.ksm;
    const balance = await getBalances(address);
    console.log(balance);
    
    setBalance(() => balance.free.toString());
  }

  return <Text style={props.style}>{balance} KSM</Text>;
}

export default Balance;
