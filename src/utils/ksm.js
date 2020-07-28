import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { getSession, client, state, QUERIES } from '../apollo';
import { getPin } from './JWT';

export async function getBalance(address, callback) {
  const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
    
    try {
      const { nonce, data: balance } = await api.query.system.account(address);
      const total =
      (parseInt(balance.free, 10) + parseInt(balance.reserved, 10)) * 0.000000000001;
      const free = parseInt(balance.free, 10) * 0.000000000001;
      wsProvider.unsubscribe();
      wsProvider.disconnect();
      callback(free, total);
      
    } catch (error) {
      alert('There was an error getting your balance');
    }    

  return 0;
}

export async function getAverageCost(callback) {
  try {
    const getUSDcost = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=kusama&vs_currencies=USD',
    );

    const json = await getUSDcost.json();

    callback(json.kusama.usd);
  } catch (error) {
    throw new Error(error);
  }

  return 0;
}

export function validateAddress(addr) {
  const addrFirstChar = addr.substring(0, 1);

  // Create an instance of the Keyring
  const keyring = new Keyring();

  encodedAddress = keyring.encodeAddress(addr, 2);

  if (
    encodedAddress === addr &&
    addrFirstChar.match(/^[A-Z]*$/) &&
    addr.length === 47
  ) {
    // This is a Prefix 2 address. Kusama addresses always start with a capital letter like C, D, F, G, H, J...
    return true;
  } else {
    // Invalid address
    return false;
  }
}


export const fetchBalacnce = async ()=>{
  const pin = await getPin()
  const { session } = await getSession();
  const res = await client.query({
    query: QUERIES.PUBLIC_KEY,
    variables: { id: session.id, pin },
  });
  const address = res.data.publicKeys.ksm;

  const  balance = {
    fee: 0.01,
    total: 0,
    averageCost: 0
  };
  try {
    await getBalance(address, (fee, total)=>{
      balance['fee']= fee;
      balance['total'] = total;
    });
  
    await getAverageCost((averageCost)=>{
      balance['averageCost'] = averageCost;
    });    
  } catch (error) {
    console.error(error);    
  }
    
  await state.mutation({
        polkadot: {
          balanceKSM: JSON.stringify(balance),
          __typename: null,
        },
      });
};
