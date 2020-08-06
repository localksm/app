import 'react-native';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { FooterWhite } from '../src/molecules';

it('renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    renderer.create(<FooterWhite stylectContainer={{}}>Footer</FooterWhite>);
  });
});
