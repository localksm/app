/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { SellButton } from '../src/atoms';

import { fireEvent, render } from 'react-native-testing-library';


configure({ adapter: new Adapter() });

it('Testing useEffect', async () => {
  let useEffect;
  await act(async () => {
    const mockUseEffect = () => {
      useEffect.mockImplementationOnce((f) => f());
    };
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
  });
});

const muckData = {
  offerAmount: 1,
  requestAmount: 2,
  paymentMethod: 'VE',
  country: 'MX',
  offerAsset: 'binance',
  other: '',
  operationType: 'add_funds',
};

const muckPaymentVars = {
  name: 'jhone',
  lastName: 'test',
  email: 'test@test.com',
  address: 'hggjhghghj5g6g75hj66',
  phone: '313213212',
  bankData: 'kjhjkhkj',
  accountNumber: '667868',
};

it('renders correctly', async () => {
  jest.useFakeTimers();
  const callBackError = jest.fn();
  const callBackActionSell = jest.fn();
  await act(async () => {
    renderer.create(
      <SellButton

        variables={muckData}
        paymentVars={muckPaymentVars}
        label="send"
        handlerError={callBackError}
        actionSell={callBackActionSell}
      />,
    );
  });
});

  
  it('clic send - correct data', async () => {
      jest.useFakeTimers();
      const openHandler = jest.fn();
      const { getByTestId } = render(
        <SellButton
          load={false}
        />,
      );
      fireEvent.press(getByTestId('test-btn'));
      expect(openHandler).not.toHaveBeenCalled()
    
  });

  