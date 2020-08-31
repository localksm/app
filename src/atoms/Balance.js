import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { withContext } from '../apollo';
import { UseBalance } from '.';

function Balance(props) {
  const { free, total, averageCost, show, set } = UseBalance(props);

  React.useEffect(() => {
    set();
  }, []);

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
