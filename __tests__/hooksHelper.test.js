import { setSessionToState, setUserAddress } from '../src/utils/hooks';

it('test setSessionState', async () => {
  function callback(data) {
    expect(data).toBe(undefined);
  }

  await setSessionToState(callback);
});
