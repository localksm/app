/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { FBLoginButton } from '../src/atoms';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  const actionPin = jest.fn();
  const actionLogin = jest.fn();
  await act(async () => {
    renderer.create(
      <FBLoginButton
        actionPin={actionPin}
        actionLogin={actionLogin}
        type={'signin'}
      />,
    );
  });
});

it('press button', async () => {
  await act(async () => {
    const actionPin = jest.fn();
    const actionLogin = jest.fn();
    let wrapper = shallow(
      <FBLoginButton
        actionPin={actionPin}
        actionLogin={actionLogin}
        type={'signin'}
      />,
    );
    wrapper.find('Button').first().dive().simulate('press');
  });
});
