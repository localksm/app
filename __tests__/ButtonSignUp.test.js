/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { ButtonSignUp } from '../src/atoms';


configure({ adapter: new Adapter() });

const muckdata = {
    name: 'test',
    email: 'test@test.com.mx',
    password: '1234567890',
    type: 'email',
    platform: 'android'
}

it('renders correctly', async () => {
  const callBackErrorEmail = jest.fn();
  const callBackErrorEmailValid = jest.fn();
  const callBackErrorName = jest.fn();
  const callBackErrorPass = jest.fn();
  const callBackErrorConfirm = jest.fn();
  await act(async () => {
    renderer.create(
      <ButtonSignUp
        variables={muckdata}
        errorEmail={callBackErrorEmail}
        errorEmailValid={callBackErrorEmailValid}
        errorName={callBackErrorName}
        errorPass={callBackErrorPass}
        errorConfirm={callBackErrorConfirm}
      />,
    );
  });
});

it('press button', async () => {
    const callBackErrorEmail = jest.fn();
    const callBackErrorEmailValid = jest.fn();
    const callBackErrorName = jest.fn();
    const callBackErrorPass = jest.fn();
    const callBackErrorConfirm = jest.fn();
  await act(async () => {
    let wrapper = shallow(
        <ButtonSignUp
        variables={muckdata}
        errorEmail={callBackErrorEmail}
        errorEmailValid={callBackErrorEmailValid}
        errorName={callBackErrorName}
        errorPass={callBackErrorPass}
        errorConfirm={callBackErrorConfirm}
      />
    );
    wrapper.find('Button').first().dive().simulate('press');
  });
});
