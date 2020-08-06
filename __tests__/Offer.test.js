import 'react-native';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Offer } from '../src/molecules';

it('renders correctly with usernameMaker', async () => {
  jest.useFakeTimers();
  await act(() => {
    renderer.create(
      <Offer
        operationType="buy"
        payment=""
        usernameMaker="Batman"
        date=""
        currency="USD"
        status="created"
      />,
    );
  });
});


it('renders correctly with no usernameMaker', async () => {
  jest.useFakeTimers();
  await act(() => {
    renderer.create(
      <Offer
        operationType="sell"
        payment=""
        date=""
        currency="USD"
        status="created"
      />,
    );
  });
});
