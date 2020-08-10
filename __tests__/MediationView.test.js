/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, render } from 'react-native-testing-library';

import { MediationView } from '../src/organisms';

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
  await renderer.act(() => {
    renderer.create(<MediationView />);
  });
});


it('test send to won mediation screen on press', async () => {
  jest.useFakeTimers();
  const openHandler = jest.fn();

  const { getByTestId } = render(
    <MediationView
      navigation={{ navigate: () => {} }}
      route={mockParams}
    />,
  );

  fireEvent.press(getByTestId('test-btn'));
  expect(openHandler).not.toHaveBeenCalled();
});
