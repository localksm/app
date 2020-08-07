import 'react-native';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { ConfirmedBuySell } from '../src/organisms';

configure({ adapter: new Adapter() });

const mockParams = {
  params: {
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

it('confirmation buy renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<ConfirmedBuySell route={mockParams} />);
  });
});

it('confirmation sell renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    mockParams.params.body.operationType = 'sell';
    create(<ConfirmedBuySell route={mockParams} />);
  });
});

