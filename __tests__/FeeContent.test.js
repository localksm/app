import 'react-native';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import renderer, { act } from 'react-test-renderer';
import { FeeContent } from '../src/atoms';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await act(async () => {
    renderer.create(
      <FeeContent
        container={'jury'}
        amount={0}
        data={{ fees: [{ fee: 'jury', amount: 10 }] }}
      />,
    );
  });
});
