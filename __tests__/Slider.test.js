/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure, shallow } from 'enzyme';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { Slider } from '../src/organisms';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<Slider />);
  });
});

it('test on change slider', async () => {
  jest.useFakeTimers();
  const wrapper = shallow(<Slider />);
  wrapper.find('RangeSlider').props().onValueChanged();
});


it('test dropdowns actions', async () => {
  jest.useFakeTimers();
  const wrapper = shallow(<Slider />);
  wrapper.find('Dropdown').at(0).props().action();
  wrapper.find('Dropdown').at(1).props().action();
});
