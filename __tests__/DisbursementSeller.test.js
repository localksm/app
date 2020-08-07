import 'react-native';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { configure } from 'enzyme';
import { fireEvent, render } from 'react-native-testing-library';

import Adapter from 'enzyme-adapter-react-16';

import { DisbursementSeller } from '../src/organisms';

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

it('confirmation sell renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<DisbursementSeller route={mockParams} />);
  });
});

it('press confirm', async () => {
  jest.useFakeTimers();

  const handler = jest.fn();

  const { getByTestId } = render(
    <DisbursementSeller
      route={mockParams}
      navigation={{ navigate: () => {} }}
    />,
  );
  fireEvent.press(getByTestId('test-btn'));
  expect(handler).not.toHaveBeenCalled();
});

it('press report problem', async () => {
  jest.useFakeTimers();

  const handler = jest.fn();

  const { getByTestId } = render(
    <DisbursementSeller
      route={mockParams}
      navigation={{ navigate: () => {} }}
    />,
  );
  fireEvent.press(getByTestId('link'));
  expect(handler).not.toHaveBeenCalled();
});
