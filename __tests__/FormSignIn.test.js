/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, render } from 'react-native-testing-library';

import { FormSignIn, FormSignInContent } from '../src/organisms';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<FormSignIn />);
  });
});

it('content renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<FormSignInContent />);
  });
});

it('content verifyPin renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<FormSignInContent verifyPin={true} />);
  });
});

it('content errors renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<FormSignInContent errorEmail={true} errorPass={true} />);
  });
});

it('test email input change', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();

  const { getByTestId } = render(<FormSignIn />);
  fireEvent.changeText(getByTestId('test-email-input'));
  expect(handler).not.toHaveBeenCalled();
});

it('test password input change', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();

  const { getByTestId } = render(<FormSignIn />);
  fireEvent.changeText(getByTestId('test-pwd-input'));
  expect(handler).not.toHaveBeenCalled();
});

it('test link to signup', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();

  const { getByTestId } = render(<FormSignIn />);
  fireEvent.press(getByTestId('link'));
  expect(handler).not.toHaveBeenCalled();
});
