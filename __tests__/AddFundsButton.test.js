/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import AddFundsButton from '../src/atoms/AddFundsButton';


configure({ adapter: new Adapter() });


it('testing useEffect', async () => {
  let useEffect;
  await act(async () => {
    const mockUseEffect = () => {
      useEffect.mockImplementationOnce((f) => f());
    };
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
  });
});

it('renders correctly', async () => {

  const muckData = {
    offerAmount: 1,
    requestAmount: 2,
    paymentMethod: 'VE',
    country: 'MX',
    offerAsset: 'binance',
    other: '',
    operationType: 'add_funds',
  };
  
  await act(async () => {
    renderer.create(<AddFundsButton
      variables={muckData}
      label="Send"
      handlerError={jest.fn()}
      actionAddFunds={jest.fn()}
      />);
  });

});

it('clic send - correct data', async () => {

  jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
  const muckData = {
    offerAmount: 1,
    requestAmount: 2,
    paymentMethod: 'VE',
    country: 'MX',
    offerAsset: 'binance',
    other: '',
    operationType: 'add_funds',
  };
  
  await act(async () => {
    let wrapper = shallow(<AddFundsButton
      variables={muckData}
      label="Send"
      handlerError={jest.fn()}
      actionAddFunds={jest.fn()}
      />);
     wrapper.find('Button').first().dive().simulate('press');;
     
  });

});

it('clic send - incorrect data', async () => {
  
  jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
  const muckData = {
    country: "", 
    offerAmount: 0, 
    offerAsset: "", 
    operationType: "add_funds", 
    other: "", 
    paymentMethod: "", 
    requestAmount: 0
  };
  
  await act(async () => {
    let wrapper = shallow(<AddFundsButton
      variables={muckData}
      label="Send"
      handlerError={jest.fn()}
      actionAddFunds={jest.fn()}
      />);
     wrapper.find('Button').first().dive().simulate('press');;
     
  });

});
