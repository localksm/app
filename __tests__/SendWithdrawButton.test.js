/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { SendWithdrawButton } from '../src/atoms';

configure({ adapter: new Adapter() });

it('testing useEffect', async () => {
  let useEffect;
  await act(async () => {
    const mockUseEffect = () => {
      useEffect.mockImplementationOnce((f) => f());
    };
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
  });
});

it('renders correctly', async () => {
  const mockdata = {
    address: 'khgjhghjghjgjhgjhg',
    amount: 1,
    id: 1,
    total: 1,
  };
  await act(async () => {
    renderer.create(
      <SendWithdrawButton label="Send" stylect={{}} variables={mockdata} />,
    );
  });
});

it('clic send - correct data', async () => {
  const mockdata = {
    address: 'khgjhghjghjgjhgjhg',
    amount: 1,
    id: 1,
    total: 1,
  };
  await act(async () => {
    let wrapper = shallow(
      <SendWithdrawButton label="Send" stylect={{}} variables={mockdata} />,
    );
    wrapper.find('Button').first().dive().simulate('press');
  });
});
