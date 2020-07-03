import { ApiPromise, WsProvider } from '@polkadot/api';

async function getBalance(address, callback) {
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

export default getBalance;
