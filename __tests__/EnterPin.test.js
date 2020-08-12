import 'react-native';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import { fireEvent, render } from 'react-native-testing-library';

import Adapter from 'enzyme-adapter-react-16';

import { EnterPin } from '../src/organisms';
import { testHook } from '../testUtils';
import { useDisabled } from '../src/utils/hooks';

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

it('confirmation buy renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<EnterPin route={mockParams} />);
  });
});

it('test useDisabled hook', async () => {
  let hook;
  testHook(() => {
    hook = useDisabled();
  });

  expect(hook.disabled).toBe(true);
});

it('test !disabled', async () => {
  const wrapper = shallow(<EnterPin />);
  wrapper.simulate('setDisabled', false);
  expect(wrapper.prop('disabled')).toEqual(undefined); // FAIL
});

it('test disabled', async () => {
  const wrapper = shallow(<EnterPin />);
  wrapper.simulate('setDisabled', true);
  expect(wrapper.prop('disabled')).toEqual(undefined); // FAIL
});


it('test on press', async () => {
  jest.useFakeTimers();
  const wrapper = shallow(<EnterPin />);
  wrapper.find('Button').props().action();
});
