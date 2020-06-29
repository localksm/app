import { WsProvider, ApiPromise } from '@polkadot/api';

async function getBalances(address) {
  const provider = new WsProvider('wss://kusama-rpc.polkadot.io');
  try {
    const api = await ApiPromise.create({ provider });
    api.query.balances.account(address);
    const balance = await api.query.balances.account(address);
    return balance
  } catch (e) {
    throw new Error(e);
  }
}

export { getBalances };
