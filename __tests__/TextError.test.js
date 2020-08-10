import 'react-native';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { TextError } from '../src/atoms';

configure({ adapter: new Adapter() });

it('renders error correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<TextError error={true} styles={{}} text="Error" />);
  });
});


it('renders error correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<TextError error={false} />);
  });
});
