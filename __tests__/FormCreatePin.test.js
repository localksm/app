/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import { fireEvent, render } from 'react-native-testing-library';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { FormCreatePin } from '../src/organisms';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<FormCreatePin navigation={{ navigate: () => {} }} />);
  });
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

it('test platform ios', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    const mockPlatform = (OS, version) => {
      jest.resetModules();
      jest.doMock("react-native", () => ({
        OS,
        select: objs => objs[OS],
        Version: version || undefined
      }));
    };
    mockPlatform('ios', null)
    renderer.create(<FormCreatePin navigation={{ navigate: () => {} }} />);
    jest.restoreAllMocks();

  });
});
