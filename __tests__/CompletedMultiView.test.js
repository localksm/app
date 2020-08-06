import 'react-native';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { CompletedMultiView } from '../src/molecules';

it('renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    renderer.create(
      <CompletedMultiView
        title="Title"
        details="Details">
        Children
      </CompletedMultiView>,
    );
  });
});
