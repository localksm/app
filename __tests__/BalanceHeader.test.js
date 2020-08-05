import 'react-native';
import React, { useState as useStateMock } from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { BalanceHeader } from '../src/molecules';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  await act(async () => {
    renderer.create(<BalanceHeader />);
  });
});

it('test state', async () => {
  await act(async () => {
    const setState = jest.fn();

    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = shallow(<BalanceHeader />);
    expect(setState).toHaveBeenCalledTimes(0);
    expect(wrapper).toMatchSnapshot();
  });
});

it('Includes one ActivityIndicator', async () => {
  await act(async () => {
    const wrapper = shallow(<BalanceHeader />);
    expect(wrapper.find('ActivityIndicator').length).toEqual(1);
  });
});

