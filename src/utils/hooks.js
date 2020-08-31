import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getSession, client, QUERIES } from '../apollo';
import { getPin } from './JWT';
import validator from 'validator';
import { sessionModel } from './config';

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

export async function handleValidateOnboardingInstruction(
  callbackSaveFlag,
  callbackNavigate,
  page,
) {
  const ins = await ls.get('instruction');
  callbackSaveFlag(ins);
  if (ins) {
    callbackNavigate.navigate(page);
  }
}

export async function setBalance(
  state,
  callbackSetFee,
  callbackSetTotal,
  callbackSetAverageCost,
  showBalance,
  applyRecursive,
) {
  try {
    const balance = await state.getData('GET_BALANCE_KSM');
    if (balance.polkadot !== null && balance.polkadot.balanceKSM !== null) {
      const obj = JSON.parse(balance.polkadot.balanceKSM);
      callbackSetFee(obj.fee.toString());
      callbackSetTotal(obj.total.toString());
      callbackSetAverageCost(obj.averageCost.toString());
      showBalance(true);
    }

    if (balance.polkadot === null || balance.polkadot.balanceKSM === null) {
      applyRecursive();
    }
  } catch (error) {
    console.warn(error);
  }
}

export function isValidValue(element, payload) {
  if (!payload) {
    return false;
  }
  if (Object.keys(payload).length === 0 && payload.constructor === Object) {
    return false;
  }

  return payload.hasOwnProperty(element) && payload[element].isInvalid;
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

export function useShow() {
  const [show, showBalance] = useState(false);

  return { show, showBalance };
}



export function useSetErrors() {
  const [errors, setErrors] = useState({});

  return { errors, setErrors };
}

export function useUserProposals(userID) {
  const { loading, error, data } = useQuery(QUERIES.QUERY_USER_PROPOSALS, {
    variables: { id: userID },
    pollInterval: 6000,
  });

  return { loading, error, data };
}
const checkValues = (
  validation,
  offeredValidate,
  requiredValidate,
  paymentValidate,
  currencyValidate,
  selectBank,
  selectOther,
  countryValidate,
  otherValidate,
) => {
  if (selectBank) {
    if (
      !offeredValidate ||
      !requiredValidate ||
      !paymentValidate ||
      !currencyValidate ||
      !countryValidate
    ) {
      validation['isValid'] = false;
      validation['currency']['isInvalid'] = !offeredValidate;
      validation['currency']['message'] = 'Offered currency cannot be empty';
      validation['requiredCurrency']['isInvalid'] = !requiredValidate;
      validation['requiredCurrency']['message'] =
        'Required currency cannot be empty';
      validation['paymentMethod']['isInvalid'] = !paymentValidate;
      validation['paymentMethod']['message'] =
        'Please select the payment method of your preference';
      validation['localCurrency']['isInvalid'] = !currencyValidate;
      validation['localCurrency']['message'] =
        'Please select your local currency';
      validation['country']['isInvalid'] = !countryValidate;
      validation['country']['message'] = 'Please select a country';

      return validation;
    }
  } else if (selectOther) {
    if (
      !offeredValidate ||
      !requiredValidate ||
      !paymentValidate ||
      !currencyValidate ||
      !otherValidate
    ) {
      validation['isValid'] = false;
      validation['currency']['isInvalid'] = !offeredValidate;
      validation['currency']['message'] = 'Offered currency cannot be empty';
      validation['requiredCurrency']['isInvalid'] = !requiredValidate;
      validation['requiredCurrency']['message'] =
        'Required currency cannot be empty';
      validation['paymentMethod']['isInvalid'] = !paymentValidate;
      validation['paymentMethod']['message'] =
        'Please select the payment method of your preference';
      validation['localCurrency']['isInvalid'] = !currencyValidate;
      validation['localCurrency']['message'] =
        'Please select your local currency';
      validation['other']['isInvalid'] = !otherValidate;
      validation['other']['message'] = 'The Other input cannot be empty';

      return validation;
    }
  } else if (
    !offeredValidate ||
    !requiredValidate ||
    !paymentValidate ||
    !currencyValidate
  ) {
    validation['isValid'] = false;
    validation['currency']['isInvalid'] = !offeredValidate;
    validation['currency']['message'] = 'Offered currency cannot be empty';
    validation['requiredCurrency']['isInvalid'] = !requiredValidate;
    validation['requiredCurrency']['message'] =
      'Required currency cannot be empty';
    validation['paymentMethod']['isInvalid'] = !paymentValidate;
    validation['paymentMethod']['message'] =
      'Please select the payment method of your preference';
    validation['localCurrency']['isInvalid'] = !currencyValidate;
    validation['localCurrency']['message'] =
      'Please select your local currency';

    return validation;
  } else {
    validation['isValid'] = true;
    return validation;
  }
};

export function validateFormFund(
  offerAmount,
  requestAmount,
  paymentMethod,
  offerAsset,
  country,
  other,
) {
  const offeredValidate = offerAmount > 0;
  const requiredValidate = requestAmount > 0;
  const paymentValidate = paymentMethod !== '' && paymentMethod !== null;
  const currencyValidate = offerAsset !== '' && offerAsset !== null;
  const selectBank = paymentMethod === 'BN';
  const selectOther = paymentMethod === 'OT';
  const countryValidate = country !== '';
  const otherValidate = other !== '';
  const validation = {
    currency: {
      isInvalid: false,
      message: '',
    },
    requiredCurrency: {
      isInvalid: false,
      message: '',
    },
    paymentMethod: {
      isInvalid: false,
      message: '',
    },
    localCurrency: {
      isInvalid: false,
      message: '',
    },
    other: {
      isInvalid: false,
      message: '',
    },
    country: {
      isInvalid: false,
      message: '',
    },
    isValid: false,
    message: '',
  };

  return checkValues(
    validation,
    offeredValidate,
    requiredValidate,
    paymentValidate,
    currencyValidate,
    selectBank,
    selectOther,
    countryValidate,
    otherValidate,
  );
}

export const mapDataAddFund = (data, session, recipientAddress) => {
  const time = Date.now();
  const date = new Date(time);
  const offerAmount = data.offerAmount;
  const requestAmount = data.requestAmount;

  const variables = {};
  variables['makerId'] = session.id;
  variables['requestAsset'] = 'native';
  variables['offerAmount'] = parseFloat(offerAmount);
  variables['offerAsset'] = data.offerAsset;
  variables['requestAmount'] = parseFloat(requestAmount);
  variables['timestamp'] = date;
  variables['juryPool'] = '';
  variables['challengeStake'] = 0.001;
  variables['paymentMethod'] = data.paymentMethod;
  variables['localCurrency'] = data.offerAsset;
  variables['recipientAddress'] = recipientAddress;

  return variables;
};

export const setStateRecipientAddress = async (callBack) => {
  const pin = await getPin();
  const { session } = await getSession();
  const recipientData = await client.query({
    query: QUERIES.PUBLIC_KEY,
    variables: {
      id: session.id,
      pin,
    },
  });
  const recipientAddress = recipientData.data.publicKeys.ksm;

  callBack(recipientAddress);
};


export async function checkValueSignin(
  email,
  password,
  actionErrorEmail,
  actionErrorPass,
) {
  const validation = {
    isValid: false,
    message: '',
  };
  
  if (email === '') {
    validation['message'] = 'Email is required';    
    actionErrorEmail();
    return validation;
  }
  if (password === '') {
    validation['message'] = 'Password is required';
    actionErrorPass()
    return validation;
  }

  if (!validator.isEmail(email)) {
    validation['message'] = 'Enter a valid email';
    actionErrorEmail();
    return validation;
  }

  if (validator.isEmpty(password)) {
    validation['message'] =
      'The password must contain at least 10 alphanumeric characters';
      actionErrorPass();
    return validation;
  }

  validation['message'] = '';
  validation['isValid'] = true;

  return validation;
}

export const mapDataSession = (data, type) =>{
  
  sessionModel['token'] = data.token;
  sessionModel['id'] = data.id;
  sessionModel['name'] = data.name;
  sessionModel['email'] = data.email;
  sessionModel['sessionType'] = type;
  sessionModel['__typename'] = 'session';

  return sessionModel;
}

export const mapDataCountries = data => {
  const resp = [];
  data.map((item, index) => {
    const { id, value } = item;
    return resp.push({
      value: id,
      label: `(${id}) - ${value}`,
      key: index,
    });
  });
  return resp;
};

export const mapDataCurrencies = data => {
  const resp = [];
  data.map((item, index) => {
    const { id, label } = item;
    return resp.push({
      value: id,
      label: `(${id}) - ${label}`,
      key: index,
    });
  });
  return resp;
};

export const mapDataSell = (data, session) => {
  const time = Date.now();
  const date = new Date(time);
  const offerAmount = data.offerAmount;
  const requestAmount = data.requestAmount;

  const variables = {};
  variables['makerId'] = session.id;
  variables['requestAsset'] = data.requestAsset;
  variables['offerAmount'] = parseFloat(offerAmount);
  variables['offerAsset'] = 'native';
  variables['requestAmount'] = parseFloat(requestAmount);
  variables['timestamp'] = date;
  variables['juryPool'] = '';
  variables['challengeStake'] = 0.001;
  variables['paymentMethod'] = data.paymentMethod;
  variables['localCurrency'] = data.requestAsset;

  return variables;
};

export const getReciepientAddress = async ()=>{

  const sessionData = await getSession();
  const session = sessionData?.session;
  const pin = await getPin()
  const recipientData = await client.query({
    query: QUERIES.PUBLIC_KEY,
    variables: {
      id: session.id,
      pin
    }
  });

  return recipientData.data.publicKeys.ksm;

}

