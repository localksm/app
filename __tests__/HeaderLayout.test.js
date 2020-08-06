import 'react-native';
import React from 'react';
import { act } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { HeaderLayout } from '../src/molecules';

configure({ adapter: new Adapter() });

it('renders correctly with VE', async () => {
  jest.useFakeTimers();
  await act(() => {
    const onPressMock = jest.fn();
    const wrapper = shallow(<HeaderLayout />);

    wrapper.find('[className="drawer-button"]').simulate('onPress', 'test');
    expect(onPressMock).not.toHaveBeenCalledWith('test');
    expect(wrapper).toMatchSnapshot();
  });
});
