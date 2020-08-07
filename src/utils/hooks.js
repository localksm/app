import { useState } from 'react';
import { getSession, client, QUERIES } from '../apollo';
import { getPin } from './JWT';

export async function setSessionToState(set) {
  const sessionData = await getSession();
  const session = sessionData?.session;
  set(session);
}

export async function setSessionId(set) {
  const sessionData = await getSession();
  const session = sessionData?.session;
  set(session?.id);
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

export function useDetails() {
  const [details, setDetails] = useState('');

  return { details, setDetails };
}

export function useEnterPintScreen() {
  const [enterPin, showEnterPin] = useState(false);

  return { enterPin, showEnterPin };
}

export function useLoader() {
  const [load, setLoad] = useState(false);

  return { load, setLoad };
}

export function useDisabled() {
  const [disabled, setDisabled] = useState(true);

  return { disabled, setDisabled };
}

export function useShowRemoveButton() {
  const [showRemoveButton, setShowRemoveButton] = useState(false);

  return { showRemoveButton, setShowRemoveButton };
}

export function useSetErrors() {
  const [errors, setErrors] = useState({});

  return { errors, setErrors };
}
