import 'react-native';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import { fireEvent, render } from 'react-native-testing-library';

import Adapter from 'enzyme-adapter-react-16';

import { Completed } from '../src/organisms';

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

it('completed renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<Completed route={mockParams} />);
  });
});

it('button action', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();
  const { getByTestId } = render(
    <Completed route={mockParams} navigation={{ navigate: () => {} }} />,
  );
  fireEvent.press(getByTestId('test-btn'));
  expect(handler).not.toHaveBeenCalled();
});
