/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import { fireEvent, render } from 'react-native-testing-library';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { OfferDetails } from '../src/organisms';

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

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(async () => {
    renderer.create(<OfferDetails route={mockParams} navigation={{ navigate: () => {} }} />);
  });
});

