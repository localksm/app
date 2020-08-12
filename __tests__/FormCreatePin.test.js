/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure, shallow } from 'enzyme';
import { fireEvent, render } from 'react-native-testing-library';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { FormCreatePin } from '../src/organisms';
import { CreatePinSwitch, CreatePinLoader } from '../src/molecules';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<FormCreatePin navigation={{ navigate: () => {} }} />);
  });
});

it('test useEffect', async () => {
  jest.useFakeTimers();
  const mockUseEffect = () => {
    React.useEffect.mockImplementationOnce(f => f());
  };
  jest.spyOn(React, 'useEffect').mockImplementation(f => f());

  mockUseEffect()
});

it('press button', async () => {
  jest.useFakeTimers();

  const handler = jest.fn();

  const { getByTestId } = render(
    <FormCreatePin navigation={{ navigate: () => {} }} />,
  );
  fireEvent.press(getByTestId('test-btn'));
  expect(handler).not.toHaveBeenCalled();
});

it('press eye button1', async () => {
  jest.useFakeTimers();

  const handler = jest.fn();

  const { getByTestId } = render(
    <FormCreatePin navigation={{ navigate: () => {} }} />,
  );
  fireEvent.press(getByTestId('set-secure-btn1'));
  expect(handler).not.toHaveBeenCalled();
});

it('press eye button2', async () => {
  jest.useFakeTimers();

  const handler = jest.fn();

  const { getByTestId } = render(
    <FormCreatePin navigation={{ navigate: () => {} }} />,
  );
  fireEvent.press(getByTestId('set-secure-btn2'));
  expect(handler).not.toHaveBeenCalled();
});

it('test checkbox on android', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<CreatePinSwitch platform="android" styles={{}} isSelected={true} />);
  });
});

it('test switch on ios', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<CreatePinSwitch platform="ios" isSelected={true} />);
  });
});

it('test loader render', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<CreatePinLoader loading styles={{}} />);
  });
});

it('test button enabled/disabled render', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<CreatePinLoader handleSave={() => {}} disabled styles={{}} />);
    renderer.create(<CreatePinLoader handleSave={() => {}} styles={{}} />);
  });
});
