/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { ButtonSignIn, useSignIn } from '../src/atoms';
import { View } from 'react-native';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  const callBackErrorEmail = jest.fn();
  const callBackErrorPassword = jest.fn();
  await act(async () => {
    renderer.create(
      <ButtonSignIn
        variables={{
          email: 'luis@catalyst.com.mx',
          password: '1234567890',
          pin: '298765',
        }}
        actionErrorEmail={callBackErrorEmail}
        actionErrorPass={callBackErrorPassword}
      />,
    );
  });
});

it('press button', async () => {
  const callBackErrorEmail = jest.fn();
  const callBackErrorPassword = jest.fn();
  await act(async () => {
    let wrapper = shallow(
      <ButtonSignIn
        variables={{
          email: 'luis@catalyst.com.mx',
          password: '1234567890',
          pin: '298765',
        }}
        actionErrorEmail={callBackErrorEmail}
        actionErrorPass={callBackErrorPassword}
      />,
    );
    wrapper.find('Button').first().dive().simulate('press');
  });
});
