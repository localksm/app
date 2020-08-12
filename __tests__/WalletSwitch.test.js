import 'react-native';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { testHook } from '../testUtils';
import { useSetSelect } from '../src/utils/hooks';
import { WalletSwitch } from '../src/molecules';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  const handleSelect = jest.fn();
  await act(() => {
    shallow(<WalletSwitch handleSelect={ handleSelect } />);
  });
});

it('renders select', async () => {
    jest.useFakeTimers();
    const handleSelect = jest.fn();
    await act(() => {
      shallow(<WalletSwitch  select={true} handleSelect={ handleSelect } />);
    });
});

it('renders !select', async () => {
    jest.useFakeTimers();
    const handleSelect = jest.fn();
    await act(() => {
      shallow(<WalletSwitch  select={false} handleSelect={ handleSelect } />);
    });
});

/*it('test useSetSelect hook', async () => {
  let hook;
  testHook(() => {
    hook = useSetSelect();
  });

  expect(hook.select).toBe(false);
});

it('test !select', async () => {
  const wrapper = shallow(<Wallet />);
  wrapper.simulate('setSelect', false);
  expect(wrapper.prop('select')).toEqual(undefined); // FAIL
});

it('test select', async () => {
  const wrapper = shallow(<Wallet />);
  wrapper.simulate('setSelect', true);
  expect(wrapper.prop('select')).toEqual(undefined); // FAIL
});

it('test clic Deposit ', async () => {
  const onPressMock = jest.fn();
  jest.useFakeTimers();
  await act(() => {
    const wrapper = shallow(<Wallet />);
    let button = wrapper.find({ testID: 'deposit' });
    button.simulate('click');
    expect(onPressMock.mock.calls.length).toEqual(0);

  });
});

it('test clic withdraw ', async () => {
  const onPressMock = jest.fn();
  jest.useFakeTimers();
  await act(() => {
    const wrapper = shallow(<Wallet />);
    let button = wrapper.find({ testID: 'withdraw' });
    button.simulate('click');
    expect(onPressMock.mock.calls.length).toEqual(0);

  });
});*/
