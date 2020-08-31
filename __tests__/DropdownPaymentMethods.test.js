import 'react-native';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import renderer, { act } from 'react-test-renderer';
import { DropdownPaymentMethods } from '../src/atoms';

Enzyme.configure({ adapter: new Adapter() });


it('renders correctly', async () => {
  jest.useFakeTimers();
  
  await act(async () => {
    renderer.create(
        <DropdownPaymentMethods />
    );
  });
});
