import 'react-native';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, render } from 'react-native-testing-library';
import { ActivityIndicator } from 'react-native';

import { act, create } from 'react-test-renderer';
import { FilePicker, FilePickerComponent } from '../src/molecules';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    const mockOnChaingeFile = jest.fn();
    create(<FilePicker onChangeFile={mockOnChaingeFile} state={{}} />);
  });
});

it('renders loader component correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    const mockOnChaingeFile = jest.fn();
    const wrapper = Enzyme.shallow(
      <FilePickerComponent
        loading={true}
        handlerSingleFilePicker={mockOnChaingeFile}
      />,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(ActivityIndicator).exists()).toBe(true);
  });
});

it('renders view component correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    const mockOnChaingeFile = jest.fn();
    const wrapper = Enzyme.shallow(
      <FilePickerComponent
        loading={false}
        handlerSingleFilePicker={mockOnChaingeFile}
        children={<p>children</p>}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});

it('open drawer', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();

  const { getByTestId } = render(<FilePicker />);
  fireEvent.press(getByTestId('picker-btn'));
  expect(handler).not.toHaveBeenCalled();
});
