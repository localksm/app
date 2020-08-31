import { setSessionToState, setUserAddress, setBalance, isValidValue, validateFormFund, mapDataAddFund, setStateRecipientAddress } from '../src/utils/hooks';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import AsyncStorage from '@react-native-community/async-storage';
import { getPin, storePin } from '../src/utils/JWT';

it('test setSessionState', async () => {
  function callback(data) {
    expect(data).toBe(undefined);
  }

  await setSessionToState(callback);
});


it('test setBalance', async () => {
  
  const dataFake = {
    polkadot:{
      balanceKSM: '{"fee":"0","total":"0", "averageCost":"0"}'
    }
  };

  function callbackFee(data) {
    expect(data).toBe('0');
  }
  function callbackTotal(data) {
    expect(data).toBe('0');
  }

  function callbackAverageCost(data) {
    expect(data).toBe('0');
  }

  function callbackShow(data) {
    expect(data).toBe(true);
  }
  function callback(data) {
    expect(data).toHaveBeenCalled();
  }

  await setBalance( dataFake, callbackFee, callbackTotal,callbackAverageCost,callbackShow,callback);

});

it('test setBalance null', async () => {
  
  const dataFake = {
    polkadot:{
      balanceKSM: null
    }
  };

  function callbackFee(data) {
    expect(data).toBe('0');
  }
  function callbackTotal(data) {
    expect(data).toBe('0');
  }

  function callbackAverageCost(data) {
    expect(data).toBe('0');
  }

  function callbackShow(data) {
    expect(data).toBe(true);
  }
  function callback(data) {
    expect(data).toHaveBeenCalled();
  }

  await setBalance( dataFake, callbackFee, callbackTotal,callbackAverageCost,callbackShow,callback);

});

it('test isValidValue',  () => {
  const dataFake= {
    name:{
      isInvalid: true,
      message: '',
    }
  }
  const result =  isValidValue('name', dataFake);
  expect(result).toBe(true);
});


it('test getPin', async () => {

  jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
  const pin = await getPin();
  
  expect(AsyncStorage.getItem).toBeCalledWith('pin');
  
});

it('test validateFormFund', () => {

  const muckData = {
    country: "", 
    offerAmount: 0, 
    offerAsset: "", 
    operationType: "add_funds", 
    other: "", 
    paymentMethod: "", 
    requestAmount: 0
  };
  const result = validateFormFund(
    muckData.offerAmount,
    muckData.requestAmount,
    muckData.paymentMethod,
    muckData.offerAsset,
    muckData.country,
    muckData.other,
  );
  expect(result.isValid).toBe(false);

  
});

it('test validateFormFund valid', () => {

  const muckData = {
    offerAmount: 1,
    requestAmount: 2,
    paymentMethod: 'VE',
    country: 'MX',
    offerAsset: 'binance',
    other: '',
    operationType: 'add_funds',
  };

  const result = validateFormFund(
    muckData.offerAmount,
    muckData.requestAmount,
    muckData.paymentMethod,
    muckData.offerAsset,
    muckData.country,
    muckData.other,
  );

  expect(result.isValid).toBe(true);
  
});

it('seleted banck validateFormFund', () => {


  const muckData = {
    country: "", 
    offerAmount: 0, 
    offerAsset: "", 
    operationType: "add_funds", 
    other: "", 
    paymentMethod: "BN", 
    requestAmount: 0
  };

  const result = validateFormFund(
    muckData.offerAmount,
    muckData.requestAmount,
    muckData.paymentMethod,
    muckData.offerAsset,
    muckData.country,
    muckData.other,
  );

  expect(result.isValid).toBe(false);
  
});

it('seleted other validateFormFund', () => {


  const muckData = {
    country: "", 
    offerAmount: 0, 
    offerAsset: "", 
    operationType: "add_funds", 
    other: "", 
    paymentMethod: "OT", 
    requestAmount: 0
  };

  const result = validateFormFund(
    muckData.offerAmount,
    muckData.requestAmount,
    muckData.paymentMethod,
    muckData.offerAsset,
    muckData.country,
    muckData.other,
  );

  expect(result.isValid).toBe(false);
  
});

it('test mapDataAddFund', () => {

  const muckData = {
    offerAmount: 1,
    requestAmount: 2,
    paymentMethod: 'VE',
    country: 'MX',
    offerAsset: 'binance',
    other: '',
    operationType: 'add_funds',
  };
  const muckSession={ id: 10 };

  const result = mapDataAddFund( muckData,muckSession, "test@test.com");
  const expected ={
    makerId: 10,
    requestAsset: 'native',
    offerAmount: 1,
    offerAsset: 'binance',
    requestAmount: 2,
    juryPool: '',
    challengeStake: 0.001,
    paymentMethod: 'VE',
    localCurrency: 'binance',
    recipientAddress: 'test@test.com'
  };

  expect(result).toEqual(expect.objectContaining(expected));
  
});







