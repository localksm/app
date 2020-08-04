/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { Button } from '../src/atoms';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
  renderer.create(
    <Button label="Button" action={() => console.log('Tested')} />,
  );
});

test('test onPress functionality', () => {
  const mockFunc = jest.fn();
  const component = shallow(<Button label="Button" action={mockFunc} />);
  component.dive().simulate('press');
  expect(mockFunc).toHaveBeenCalled();
});
