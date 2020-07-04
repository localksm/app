import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import {getBalance, getAverageCost} from '../utils/ksm';
import { QUERIES, client } from '../apollo';

function Balance(props) {
  const [free, setFreeBalance] = React.useState(0);
  const [total, setTotalBalance] = React.useState(0);
  const [averageCost, setAverageCost] = React.useState(0);
  const [show, showBalance] = React.useState(false);

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
      await getBalance(address, setResponse);
      await getAverageCost(setCostResponse);
    } catch (e) {
      throw new Error(e);
    }
  }

  function setResponse(freeBalance, totalBalance) {
    setFreeBalance(() => freeBalance.toString());
    setTotalBalance(() => totalBalance.toString());
    showBalance(true);
  }

   function setCostResponse(cost) {
    setAverageCost(() => cost.toString());
    showBalance(true);
  }

  return !show ? (
    <ActivityIndicator />
  ) : (
    <>
      <Text style={props.styleTotal}>{total} KSM</Text>      
      {!props.isDrawer ? 
        (<Text style={{ ...props.styleText, fontSize: 14 }}>{' '}≈${(averageCost*total).toFixed(2)} USD</Text>) 
        : 
        (<Text style={{...props.styleFree, fontSize:10}}>free: {free} KSM</Text>
      )}
    </>
  );
}

export default Balance;
