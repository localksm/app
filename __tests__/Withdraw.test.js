import 'react-native';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, render } from 'react-native-testing-library';

import { Withdraw } from '../src/organisms';
import { WithdrawText } from '../src/molecules';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<Withdraw />);
  });
});


it('text renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<WithdrawText show={true} styles={{}} total={0} />);
  });
});

it('text renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<WithdrawText show={false} styles={{}} total={0} />);
  });
});


it('test amount onchangetext', async () => {
  jest.useFakeTimers();
  const openHandler = jest.fn();

  const { getByTestId } = render(<Withdraw />);
  fireEvent.changeText(getByTestId('test-change-amount'));
  expect(openHandler).not.toHaveBeenCalled();
});

it('test address onchangetext', async () => {
  jest.useFakeTimers();
  const openHandler = jest.fn();

  const { getByTestId } = render(<Withdraw />);
  fireEvent.changeText(getByTestId('test-change-address'));
  expect(openHandler).not.toHaveBeenCalled();
});

