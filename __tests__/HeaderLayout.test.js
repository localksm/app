import 'react-native';
import React from 'react';
import { act } from 'react-test-renderer';
import { fireEvent, render } from 'react-native-testing-library';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { HeaderLayout } from '../src/molecules';

configure({ adapter: new Adapter() });

it('header renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    const wrapper = shallow(<HeaderLayout />);
    expect(wrapper).toMatchSnapshot();
  });
});

it('open drawer', async () => {
  jest.useFakeTimers();
  const openHandler = jest.fn();
  
  const { getByTestId } = render(<HeaderLayout />);
  fireEvent.press(getByTestId('drawer-button'));
  expect(openHandler).not.toHaveBeenCalled();
});
