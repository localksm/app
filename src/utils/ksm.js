// import { WsProvider, ApiPromise } from '@polkadot/api';
import fetch from 'node-fetch';

async function getBalance(address) {
  console.log('STARTING');

  const URL = 'https://kusama.subscan.io/api/open/account';
  const aux = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ address: address }),
  });

  const res = await aux.json();
  
  if(res.code === 0){
      return res.data.balance;
    }
    return 0;
}

export default getBalance;
