import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { getBalance, getAverageCost } from '../utils/ksm';
import { QUERIES, client, withContext } from '../apollo';
import { getPin } from '../utils/JWT';

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
      const balance = await props.state.getData('GET_BALANCE_KSM');
      if (balance.polkadot !== null && balance.polkadot.balanceKSM !== null) {
        const obj = JSON.parse(balance.polkadot.balanceKSM);
        setResponse(obj.fee, obj.total);
        if (!props.isDrawer) {
          setCostResponse(obj.averageCost);
        }
      }
      if (balance.polkadot === null || balance.polkadot.balanceKSM === null) {
        setTimeout(() => {
          set();
        }, 2700);
      }
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
      {!props.isDrawer ? (
        <Text style={{ ...props.styleText, fontSize: 14 }}>
          {' '}
          ≈${(averageCost * total).toFixed(2)} USD
        </Text>
      ) : (
        <Text style={{ ...props.styleFree, fontSize: 10 }}>
          free: {free} KSM
        </Text>
      )}
    </>
  );
}

export default withContext(Balance);
