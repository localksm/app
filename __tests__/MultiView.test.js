import 'react-native';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { MultiView } from '../src/molecules';

it('renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    renderer.create(
      <MultiView
        title="Title"
        exchange="Exchange"
        details="Details"
        stylect={{}}>
        Children
      </MultiView>,
    );
  });
});
