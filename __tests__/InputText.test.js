import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { InputText } from '../src/atoms';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
  renderer.create(
    <InputText noReturn onChangeText={() => console.log('Tested')} />,
  );
});

test('test onChangeText functionality', () => {
  const handleChangeText = jest.fn();
  const component = shallow(<InputText onChangeText={handleChangeText} />);
  component.simulate('changeText', 'input text');
  expect(handleChangeText).toHaveBeenCalledWith('input text');
});
