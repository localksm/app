/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import { fireEvent, render } from 'react-native-testing-library';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { MyOffer } from '../src/organisms';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<MyOffer navigation={{ navigate: () => {} }} />);
  });
});

