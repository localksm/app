/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure, shallow } from 'enzyme';
import { fireEvent, render } from 'react-native-testing-library';
import toJson from 'enzyme-to-json'

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { OfferDetails, OfferDetailContent } from '../src/organisms';

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
    renderer.create(
      <OfferDetails route={mockParams} navigation={{ navigate: () => {} }} />,
    );
  });
});

it('renders paymentForm correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(async () => {
    renderer.create(
      <OfferDetailContent
        operationType="buy"
        paymentMethod="PP"
        loading
        paymentDataform
        route={mockParams}
        offerDetialsStyles={{}}
        navigation={{ navigate: () => {} }}
      />,
    );
  });
});

it('renders PaymentForm empty correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(async () => {
    renderer.create(
      <OfferDetailContent
        operationType="sell"
        paymentMethod="PP"
        paymentDataform
        route={mockParams}
        offerDetialsStyles={{}}
        navigation={{ navigate: () => {} }}
      />,
    );
  });
});

it('renders enterPin correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(async () => {
    renderer.create(
      <OfferDetailContent
        enterPinScreen
        operationType="sell"
        paymentMethod="PP"
        paymentDataform
        route={mockParams}
        offerDetialsStyles={{}}
        navigation={{ navigate: () => {} }}
      />,
    );
  });
});

it('test link on press', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();

  const { getByTestId } = render(
    <OfferDetails navigation={{ navigate: () => {} }} route={mockParams} />,
  );

  fireEvent.press(getByTestId('link'));
  expect(handler).not.toHaveBeenCalled();
});

it('test on press', async () => {
  jest.useFakeTimers();
  const wrapper = shallow(
    <OfferDetailContent
      enterPinScreen
      operationType="sell"
      paymentMethod="PP"
      paymentDataform
      route={mockParams}
      offerDetialsStyles={{}}
      setState={() => {}}
      navigation={{ navigate: () => {} }}
    />,
  );
  wrapper.find('EnterPin').props().action();
});

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(async () => {
    const wrapper = shallow(
      <OfferDetails route={mockParams} navigation={{ navigate: () => {} }} />,
    );

    wrapper.props().setState;
    expect(wrapper.props().setState);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
