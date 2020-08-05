import { getSession, client, QUERIES } from '../apollo';
import { getPin } from './JWT';

export async function setSessionToState(set) {
  const sessionData = await getSession();
  const session = sessionData?.session;
  set(session);
}

export async function setUserAddress(set) {
  const pin = await getPin();
  const sessionData = await getSession();
  const session = sessionData?.session;

  try {
    const res = await client.query({
      query: QUERIES.PUBLIC_KEY,
      variables: { id: session?.id, pin },
    });

    const addressData = res.data.publicKeys.ksm;
    set(addressData);
  } catch (e) {
    throw new Error(e);
  }
}
