import 'react-native';
import React from 'react';
import { act } from 'react-test-renderer';
import { fireEvent, render } from 'react-native-testing-library';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { HomeLayout } from '../src/organisms';

configure({ adapter: new Adapter() });

it('layout renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    const wrapper = shallow(<HomeLayout />);
    expect(wrapper).toMatchSnapshot();
  });
});
