import { Clipboard } from 'react-native';
import Toast from 'react-native-root-toast';

export function mapPaymentMethod(method) {
  const methods = {
    VE: 'Venmo',
    ZE: 'Zelle',
    MP: 'Mercado Pago',
    WU: 'Western Union',
    MG: 'Money Gram',
    NE: 'Neteller',
    UP: 'Uphold',
    PP: 'Paypal',
    BN: 'Bank',
    OT: 'Other',
  };
  return methods[method];
}

export function cleanText(val) {
  return typeof val === 'string'
    ? val.replace(/[`~!#$%^&*()|·+\-=÷¿?;:'",<>\{\}\[\]\\\/]/gi, '')
    : val;
}

export function copy(address) {
  Toast.show('Copied Address!', {
    backgroundColor: 'white',
    textColor: 'black',
  });
  Clipboard.setString(address);
}

const nameInput = {
  element: 'name',
  placeholder: 'Name',
  type: 'input',
  keyboardType: 'default',
  autoCapitalize: 'sentences',
};

const lastNameInput = {
  element: 'lastName',
  placeholder: 'Last Name',
  type: 'input',
  keyboardType: 'default',
  autoCapitalize: 'sentences',
};

const emailInput = {
  element: 'email',
  placeholder: 'Email',
  type: 'input',
  keyboardType: 'default',
  autoCapitalize: 'none',
};

const accountNumberInput = {
  element: 'accountNumber',
  placeholder: 'Account Number',
  type: 'input',
  keyboardType: 'default',
  autoCapitalize: 'sentences',
};

const bankDataInput = {
  element: 'bankData',
  placeholder: 'Payment Data',
  type: 'textarea',
  keyboardType: 'default',
};

const addressInput = {
  element: 'address',
  placeholder: 'Address',
  type: 'textarea',
  keyboardType: 'default',
};

const phoneInput = {
  element: 'phone',
  placeholder: 'Phone',
  type: 'input',
  keyboardType: 'numeric',
  autoCapitalize: 'none',
};

export const paymentMethods = {
  ['VE']: {
    fields: [nameInput, lastNameInput, emailInput],
  },
  ['ZE']: {
    fields: [nameInput, lastNameInput, accountNumberInput, emailInput],
  },
  ['MP']: {
    fields: [nameInput, lastNameInput, emailInput, bankDataInput, addressInput],
  },
  ['WU']: {
    fields: [nameInput, lastNameInput, bankDataInput, addressInput],
  },
  ['MG']: {
    fields: [
      nameInput,
      lastNameInput,
      phoneInput,
      bankDataInput,
      addressInput,
      bankDataInput,
    ],
  },
  ['NE']: {
    fields: [nameInput, lastNameInput, emailInput],
  },
  ['UP']: {
    fields: [nameInput, lastNameInput, emailInput],
  },
  ['PP']: {
    fields: [nameInput, lastNameInput, emailInput],
  },
  ['BN']: {
    fields: [nameInput, lastNameInput, bankDataInput],
  },
  ['OT']: {
    fields: [],
  },
};

export function cardProposalNavigation(item, navigation) {
  switch (item.body.operationType) {
    case 'add_funds':
      return navigation.navigate('DetailsOffer', { ...item });
    case 'withdraw_funds':
      return navigation.navigate('DetailsOffer', { ...item });
    case 'buy':
      return navigation.navigate('DetailsOffer', { ...item });
    case 'sell':
      return navigation.navigate('DetailsOffer', { ...item });
    default:
      Alert.alert('Warning!', 'Unexpected error, contact the support area');
      break;
  }
}

export const email = 'support@localksm.com';
export function copyEmail() {
  const email = 'support@localksm.com';

  Toast.show('Copied Email!', { backgroundColor: 'white', textColor: 'black' });
  Clipboard.setString(email);
}
