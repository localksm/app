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
