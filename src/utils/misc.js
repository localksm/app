import { Clipboard } from 'react-native';
import Toast from 'react-native-root-toast';
import RNFS from 'react-native-fs';
import randomString from 'random-string';
import { Buffer } from 'buffer';
import { Auth, Storage } from 'aws-amplify';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import awsconfig from '../S3/aws-exports';
import { getSession, QUERIES, client, setSession } from '../apollo';
import { getPin, removePin, storePin } from './JWT';
import { sessionModel } from './config';
import { getBalance, fetchBalacnce } from './ksm';
import FormValidator from './validator';
import { PinFormValidations, createPinValidations } from './validations';

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
    fields: [nameInput, lastNameInput, phoneInput, bankDataInput, addressInput],
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

// Upload handler
async function upload(id, fullName, buffer, serverSideEncryption) {
  Auth.configure(awsconfig.Auth);
  Storage.configure(awsconfig.Storage);
  const aux = await Storage.put(`${id}/${fullName}`, buffer, {
    serverSideEncryption,
  });
  return aux.key;
}

async function handlerSaveImage(uriImage, { session }) {
  const nameRandom = randomString({
    length: 16,
    numeric: true,
    letters: true,
    special: false,
    exclude: ['a', 'b', '1'],
  });
  const extension = uriImage.type.replace('image/', '.');
  const fullName = `${nameRandom}${extension}`;
  const serverSideEncryption = 'AES256';
  const base64 = await RNFS.readFile(uriImage.uri, 'base64');
  const buffer = Buffer.from(base64, 'base64');
  const { id } = session;

  return await upload(id, fullName, buffer, serverSideEncryption);
}

export async function handlerSingleFilePicker(
  props,
  setLoad,
  chosenItems,
  setChosenItems,
) {
  const session = await getSession();
  setLoad(true);
  const { onChangeFile } = props;
  if (Platform.OS === 'ios') {
    ImagePicker.showImagePicker({}, async (response) => {
      if (response.didCancel) {
        setLoad(false);
        return;
      } else if (response.error) {
        setLoad(false);
        return alert(response.error);
      } else if (response.customButton) {
        setLoad(false);
        return;
      } else {
        const { uri, type } = response;
        const imageResponse = await new Promise((resolve, reject) => {
          ImageResizer.createResizedImage(
            uri,
            672,
            896,
            `${type.replace('image/', '')}`.toUpperCase(),
            70,
          )
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
        });

        const chosenItemsNew = chosenItems;
        const s3key = await handlerSaveImage(
          { uri: imageResponse.uri, type },
          session,
        );
        chosenItemsNew.push(s3key);
        const localImages = [];
        localImages.push(imageResponse.uri);
        setChosenItems(chosenItemsNew);

        props.state.mutation({
          evidenceImages: {
            images: localImages,
            __typename: null,
          },
        });

        setLoad(false);
        onChangeFile(chosenItems);
      }
    });
  } else {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      if (chosenItems) {
        const { uri, type } = res[0];

        const imageResponse = await new Promise((resolve, reject) => {
          ImageResizer.createResizedImage(
            uri,
            672,
            896,
            `${type.replace('image/', '')}`.toUpperCase(),
            70,
          )
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
        });

        const chosenItemsNew = chosenItems;
        const s3key = await handlerSaveImage(
          { uri: imageResponse.uri, type },
          session,
        );
        chosenItemsNew.push(s3key);
        const localImages = [];
        localImages.push(imageResponse.uri);

        props.state.mutation({
          evidenceImages: {
            images: localImages,
            __typename: null,
          },
        });

        setChosenItems(chosenItemsNew);
        setLoad(false);
        onChangeFile(chosenItems);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setLoad(false);
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }
}

export async function processAction(
  props,
  navigation,
  sendSettlement,
  sendFulfillment,
) {
  let currentStep;

  const pin = await getPin();
  const { session } = await getSession();
  const { id } = session;
  const proposalId = props.route.params.id;
  const { body } = props.route.params;
  const { takerId } = body;
  const settlementNode = 'makerBuyer';
  const fulfillmentNode = 'makerBuyer';

  try {
    currentStep = 'Settlement';
    await sendSettlement[0]({
      variables: {
        proposalId,
        makerId: id,
        takerId,
        pin,
        node: settlementNode,
      },
    });

    currentStep = 'Fulfillment';
    sendFulfillment[0]({
      variables: {
        proposalId,
        takerId,
        node: fulfillmentNode,
      },
      refetchQueries: [
        {
          query: QUERIES.QUERY_USER_PROPOSALS,
          variables: {
            id: takerId,
            offset: 0,
            limit: 100,
          },
        },
      ],
    });

    // Navigate
    return navigation.navigate('ConfirmedSell', {
      ...props.route.params,
    });
  } catch (e) {
    alert(`There was an error during ${currentStep}. Please try again later`);
  }
}

// ConfirmedBuySell Region
export async function handleVerifyPin(setPin, setVeriFyPin) {
  const { session } = await getSession();
  const pin = await getPin();
  const response = await client.query({
    query: QUERIES.VERIFY_PIN,
    variables: { id: session.id, pin: pin },
  });
  const { isValid } = response.data.validatePin;
  if (isValid) {
    setPin(pin);
  }
  setVeriFyPin(!isValid);
}
// ConfirmedBuySell Region End

// Withdraw region
async function getAddress(id) {
  const pin = await getPin();

  const res = await client.query({
    query: QUERIES.PUBLIC_KEY,
    variables: { id, pin },
  });

  const address = res.data.publicKeys.ksm;

  return address;
}

export async function setAddressAndBalance(
  setId,
  setFreeBalance,
  setTotalBalance,
  showBalance,
) {
  const { session } = await getSession();
  setId(session.id);

  try {
    const address = await getAddress(session.id);
    await getBalance(address, (freeBalance, totalBalance) => {
      setFreeBalance(() => freeBalance.toString());
      setTotalBalance(() => totalBalance.toString());
      showBalance(true);
    });
  } catch (e) {
    throw new Error(e);
  }
}
// Withdraw region End

// CREATE PIN REGION
export function mapUser(data) {
  sessionModel['token'] = data.token;
  sessionModel['id'] = data.id;
  sessionModel['name'] = data.name;
  sessionModel['email'] = data.email;
  sessionModel['sessionType'] = 'email';
  sessionModel['__typename'] = 'session';

  return sessionModel;
}

const validateForm = (variables) => {
  const formValidator = new FormValidator(PinFormValidations);
  let validation = formValidator.validate(variables);
  return validation;
};

export const savePin = async (pinCode, setErrors, props) => {
  const { session } = await getSession();

  const validator = validateForm({
    pin: pinCode,
  });
  setErrors(validator);
  if (validator.isValid) {
    storePin(pinCode, async (jwt) => {
      const { data } = await client.query({
        query: QUERIES.VERIFY_PIN,
        variables: {
          id: session.id,
          pin: jwt,
        },
      });

      const pinIsValid = data.validatePin.isValid;
      if (!pinIsValid) {
        await removePin();
        pinView.current.clearAll();
        return alert('Invalid Pin');
      }
      if (props.isLogin) {
        props.actionLogin();
      }

      if (props.action) props.action(jwt);
      props.setPin(jwt);
      props.setScreen(false);
    });
  }
};

const validateFormCreatePin = (variables, valuePin, confirmPinValue) => {
  const formValidator = new FormValidator(createPinValidations);
  let validation = formValidator.validate(variables);

  if (validation.isValid) {
    validation = {
      pinConfirm: {
        isInvalid: valuePin !== confirmPinValue,
        message: 'The PIN confirmation does not match',
      },
      isValid: valuePin === confirmPinValue,
    };
  }

  return validation;
};

export const handleSave = (
  props,
  signup,
  login,
  setErrors,
  setLoading,
  valuePin,
  confirmPinValue,
) => {
  const validator = validateFormCreatePin(
    {
      pin: valuePin,
      pinConfirm: confirmPinValue,
    },
    valuePin,
    confirmPinValue,
  );

  setErrors(validator);
  if (validator.isValid) {
    setLoading(true);
    try {
      storePin(valuePin, async (token) => {
        const { data } = await signup[0]({
          variables: {
            ...props.route.params.payload,
            pin: token,
          },
        });
        const { success } = data.signup;
        if (success) {
          const { data } = await login[0]({
            variables: {
              ...props.route.params.payload,
            },
          });
          const { success } = data.login;
          if (success) {
            const session = mapUser(data.login);
            await setSession({ session });
            fetchBalacnce();
            return props.navigation.navigate('Drawer');
          } else {
            setLoading(false);
            return Alert.alert(
              'Warning!',
              'An unexpected error occurred while starting session',
            );
          }
        } else {
          setLoading(false);
          return Alert.alert(
            'Warning!',
            'An unexpected error occurred while registering the user',
          );
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
};

// CREATE PIN REGION END

// REPORT PROBLEM REGION
export const onChangeFile = async (
  state,
  galleryImages,
  setGalleryImages,
  setChosenItemsCount,
) => {
  const evidence = await state.getData('SELECTED_IMAGES');
  const newGalleryImages = [...galleryImages];
  evidence.evidenceImages.images.forEach((x) =>
    newGalleryImages.push({
      source: { uri: x },
      dimensions: { width: 150, height: 150 },
    }),
  );

  setGalleryImages(newGalleryImages);
  setChosenItemsCount(newGalleryImages.length);
};
// REPORT PROBLEM REGION END

// MY OFFER REGION
export async function prepareData(setuserID, setName) {
  const { session } = await getSession();
  setuserID(session.id);
  setName(session.name);
}

export async function myOfferNavigator(item, navigation, name) {
  const isMaker = name === item.body.usernameMaker;
  const isBuy =
    item.body.operationType === 'add_funds' ||
    item.body.operationType === 'buy';
  const isSettle = item.settle;
  switch (item.status) {
    case 'created':
      return navigation.navigate('Confirmation', { ...item });
    case 'accepted':
      if (isMaker) {
        if (isBuy) {
          return navigation.navigate('ConfirmedBuy', {
            ...item,
          });
        } else {
          if (!isSettle) {
            return navigation.navigate('SendSettlementMaker', {
              ...item,
            });
          }
          return navigation.navigate('ConfirmedSell', {
            ...item,
          });
        }
      } else {
        if (isBuy) {
          return navigation.navigate('AcceptedBuy', {
            ...item,
          });
        } else {
          return navigation.navigate('AcceptedSell', {
            ...item,
          });
        }
      }

    case 'confirmed':
      if (isMaker) {
        if (isBuy) {
          if (item.disbursed) {
            return navigation.navigate('DisburseSeller', {
              ...item,
            });
          }
          return navigation.navigate('ConfirmedBuy', {
            ...item,
          });
        } else {
          // If is a sell and I am the maker then send me to the buyer disburse
          return navigation.navigate('DisburseBuyer', {
            ...item,
          });
        }
      } else {
        if (isBuy) {
          // If is a buy and I am the taker then send me to the buyer disburse
          return navigation.navigate('DisburseBuyer', {
            ...item,
          });
        } else {
          if (item.disbursed) {
            return navigation.navigate('DisburseSeller', {
              ...item,
            });
          }

          return navigation.navigate('ConfirmedSell', {
            ...item,
          });
        }
      }

    case 'completed':
      return navigation.navigate('TransactionCompleted', {
        ...item,
      });
    default:
      Alert.alert('Warning!', 'Proposal not found');
      break;
  }

  navigation.navigate('DetailsOffer');
}

// MY OFFER REGION END
