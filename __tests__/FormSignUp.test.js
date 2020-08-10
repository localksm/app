/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, render } from 'react-native-testing-library';

import { FormSignUp } from '../src/organisms';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<FormSignUp />);
  });
});

it('test username input change', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();

  const { getByTestId } = render(<FormSignUp />);
  fireEvent.changeText(getByTestId('test-signup-username-change'));
  expect(handler).not.toHaveBeenCalled();
});

it('test email input change', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();

  const { getByTestId } = render(<FormSignUp />);
  fireEvent.changeText(getByTestId('test-signup-email-change'));
  expect(handler).not.toHaveBeenCalled();
});

it('test password input change', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();

  const { getByTestId } = render(<FormSignUp />);
  fireEvent.changeText(getByTestId('test-signup-password-change'));
  expect(handler).not.toHaveBeenCalled();
});

it('test password confirm input change', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();

  const { getByTestId } = render(<FormSignUp />);
  fireEvent.changeText(getByTestId('test-signup-password-confirm-change'));
  expect(handler).not.toHaveBeenCalled();
});

