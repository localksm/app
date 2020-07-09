import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

export async function getBalance(address, callback) {
  const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });

  await api.query.system
    .account(address, ({ nonce, data: balance }) => {
      const total =
        (parseInt(balance.free, 10) + parseInt(balance.reserved, 10)) *
        0.000000000001;
      const free = parseInt(balance.free, 10) * 0.000000000001;
      callback(free, total);
    })
    .catch(e => {
      throw new Error(e);
    });

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
