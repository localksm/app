import 'react-native';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import { fireEvent, render } from 'react-native-testing-library';

import Adapter from 'enzyme-adapter-react-16';

import { ConfirmedBuySell } from '../src/organisms';
import { ConfirmedBuySellButton } from '../src/molecules';

configure({ adapter: new Adapter() });

const mockParams = {
  params: {
    status: 'accepted',
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
    mockParams.params.status = 'confirmed';
    create(<ConfirmedBuySell route={mockParams} />);
  });
});

it('test report problem on press', async () => {
  jest.useFakeTimers();
  const openHandler = jest.fn();

  const { getByTestId } = render(
    <ConfirmedBuySell navigation={{ navigate: () => {} }} route={mockParams} />,
  );

  fireEvent.press(getByTestId('link'));
  expect(openHandler).not.toHaveBeenCalled();
});

it('test confirmation alert', async () => {
  jest.useFakeTimers();
  await act(() => {
    const wrapper = shallow(<ConfirmedBuySellButton send={true} />);

    expect(wrapper).toMatchSnapshot();
  });
});

it('confirmation buy button renders correctly with buy and accepted', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(
      <ConfirmedBuySellButton
        send={false}
        status="accepted"
        operationType="buy"
        variables={{}}
        navigation={{ navigate: () => {} }}
        params={mockParams}
      />,
    );
  });
});

it('confirmation buy button renders correctly with buy and confirmed', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(
      <ConfirmedBuySellButton
        send={false}
        status="confirmed"
        operationType="buy"
        variables={{}}
        navigation={{ navigate: () => {} }}
        params={mockParams}
      />,
    );
  });
});