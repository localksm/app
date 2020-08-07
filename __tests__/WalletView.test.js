import 'react-native';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { WalletView } from '../src/organisms';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<WalletView />);
  });
});
