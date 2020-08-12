/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure } from 'enzyme';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { MyOffer } from '../src/organisms';
import { OfferItem } from '../src/molecules';

configure({ adapter: new Adapter() });

const itemMock = {
  status: 'created',
  body: {
    paymentMethod: 'VE',
    usernameMaker: 'Maker',
    updatedAt: '2020-08-07T01:15:45.503Z',
    requestAmount: 0,
    offerAmount: 0,
    offerAsset: 'native',
    requestAsset: 'native',
    operationType: 'buy',
  },
};

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<MyOffer navigation={{ navigate: () => {} }} />);
  });
});

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(
      <OfferItem item={itemMock} navigation={{ navigate: () => {} }} />,
    );
  });
});

it('renders sell correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    itemMock.body.operationType = 'sell';
    renderer.create(
      <OfferItem item={itemMock} navigation={{ navigate: () => {} }} />,
    );
  });
});
