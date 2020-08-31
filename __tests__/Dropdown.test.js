/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { Dropdown } from '../src/atoms';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
  shallow(
    <Dropdown
      items={[]}
      label="Test Dropdown"
      action={() => console.log('test')}
    />,
  );
});
