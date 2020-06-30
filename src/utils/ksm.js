// import { WsProvider, ApiPromise } from '@polkadot/api';

async function getBalances(address) {
  const URL = 'https://kusama.subscan.io/api/open/account';
    const aux = await fetch(URL, {
        method:'POST', 
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({address:address})
    });
    const res = await aux.json();
    console.log('ES EL BALANCE ====>',res)
    return res;
}

export default getBalances;
