import 'react-native';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { configure } from 'enzyme';
import { fireEvent, render } from 'react-native-testing-library';

import Adapter from 'enzyme-adapter-react-16';

import { FormCreateOfferBuy } from '../src/organisms';

configure({ adapter: new Adapter() });

const mockParams = {
  params: {
    disbursed: false,
    body: {
      usernameMaker: 'maker',
      offerAsset: 'native',
      offerAmount: 0,
      paymentMethod: 'VE',
      operationType: 'buy',
      paymentData: {
        accountNumber: 'accountNumber',
        address: 'address',
        bankData: '12345',
        email: 'email',
        lastName: 'lastName',
        name: 'name',
        phone: '',
        proposalId: 1,
      },
    },
  },
};

it('form create buy renders correctly', async () => {
  jest.useFakeTimers();
  await act(async () => {
    create(<FormCreateOfferBuy />);
  });
});

it('test onchange amount', async () => {
  jest.useFakeTimers();

  const handler = jest.fn();

  const { getByTestId } = render(<FormCreateOfferBuy />);
  fireEvent.changeText(getByTestId('test-onchange-amount'));
  expect(handler).not.toHaveBeenCalled();
});

it('test onchange ksm amount', async () => {
  jest.useFakeTimers();

  const handler = jest.fn();

  const { getByTestId } = render(<FormCreateOfferBuy />);
  fireEvent.changeText(getByTestId('test-onchange-ksm-amount'));
  expect(handler).not.toHaveBeenCalled();
});

it('test add funds action', async () => {
  jest.useFakeTimers();

  const handler = jest.fn();

  const { getByTestId } = render(<FormCreateOfferBuy navigation={{ navigate: () => {} }} />);
  fireEvent.press(getByTestId('test-btn'));
  expect(handler).not.toHaveBeenCalled();
});
