/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import { fireEvent, render } from 'react-native-testing-library';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { MediationResult } from '../src/organisms';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<MediationResult navigation={{ navigate: () => {} }} />);
  });
});

it('press button', async () => {
  jest.useFakeTimers();

  const handler = jest.fn();

  const { getByTestId } = render(
    <MediationResult navigation={{ navigate: () => {} }} />,
  );
  fireEvent.press(getByTestId('test-btn'));
  expect(handler).not.toHaveBeenCalled();
});
