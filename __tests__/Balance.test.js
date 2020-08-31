/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Balance from '../src/atoms/Balance';

configure({ adapter: new Adapter() });

const mockBalancePolkadot = {
  state: {
    getData: jest.fn(),
  },
};

it('renders correctly', async () => {
  jest.useFakeTimers();
  await act( async ()=>{
    renderer.create(<Balance {...mockBalancePolkadot} />);
  })
});

it('Testing useEffect', async () => {
  let useEffect;
  await act(async () => {
    const mockUseEffect = () => {
      useEffect.mockImplementationOnce((f) => f());
    };
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
  });
});
