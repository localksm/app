/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { Link } from '../src/atoms';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
  renderer.create(
    <Link label="Link" action={() => console.log('Tested')} />,
  );
});

test('test onPress functionality', () => {
  const mockFunc = jest.fn();
  const component = shallow(<Link label="Link" action={mockFunc} />);
  component.dive().simulate('press');
  expect(mockFunc).toHaveBeenCalled();
});
