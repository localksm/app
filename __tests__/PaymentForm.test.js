import 'react-native';
import React from 'react';
import { act } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {
  PaymentForm,
  PaymentFormInputs,
  FormTextInp,
  FormTextAreaInp,
  FormInput,
} from '../src/molecules';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    const onChange = (value) => jest.fn(value);
    const wrapper = shallow(
      <PaymentForm show method="VE" onChangeText={onChange} errors={{}} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});

it('renders payment text input', async () => {
  jest.useFakeTimers();
  await act(() => {
    const handleChangeMock = jest.fn();
    const wrapper = shallow(
      <FormTextInp
        element="name"
        placeholder="name"
        keyboardType="default"
        autoCapitalize="sentences"
        onChangeText={handleChangeMock}
        errors={{}}
      />,
    );
    wrapper.find('InputText').simulate('changeText', 'test text');
    expect(handleChangeMock).toHaveBeenCalledWith('name', 'test text');
    expect(wrapper).toMatchSnapshot();
  });
});

it('renders payment text textarea', async () => {
  jest.useFakeTimers();
  await act(() => {
    const handleChangeMock = jest.fn();
    const wrapper = shallow(
      <FormTextAreaInp
        element="name"
        placeholder="name"
        onChangeText={handleChangeMock}
        errors={{}}
        styles={{}}
      />,
    );
    wrapper.find('Textarea').simulate('changeText', 'test text');
    expect(handleChangeMock).toHaveBeenCalledWith('name', 'test text');
    expect(wrapper).toMatchSnapshot();
  });
});

it('renders payment input type text input', async () => {
  jest.useFakeTimers();
  await act(() => {
    const handleChangeMock = jest.fn();
    const wrapper = shallow(
      <FormInput
        element="name"
        placeholder="name"
        keyboardType="default"
        autoCapitalize="sentences"
        onChangeText={handleChangeMock}
        errors={{}}
        styles={{}}
        type="input"
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});


it('renders payment input type text textarea', async () => {
  jest.useFakeTimers();
  await act(() => {
    const handleChangeMock = jest.fn();
    const wrapper = shallow(
      <FormInput
        element="name"
        placeholder="name"
        keyboardType="default"
        autoCapitalize="sentences"
        onChangeText={handleChangeMock}
        errors={{}}
        styles={{}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});

it('renders paymentInputs correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    const onChange = (value) => jest.fn(value);
    const wrapper = shallow(
      <PaymentFormInputs show method="VE" onChangeText={onChange} errors={{}} styles={{}} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});