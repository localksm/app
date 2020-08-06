import 'react-native';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import renderer, { act } from 'react-test-renderer';
import { WalletContent } from '../src/molecules';

Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

it('renders correctly', async () => {
  await act(async () => {
    renderer.create(
      <WalletContent
        id={0}
        imageStyle={{}}
        textKeyStyle={{}}
        textCopyStyle={{}}
      />,
    );
  });
});

it('test copy address', async () => {
  jest.useFakeTimers();
  await act(() => {
    const onPressMock = jest.fn();
    const wrapper = Enzyme.shallow(
      <WalletContent
        id={0}
        imageStyle={{}}
        textKeyStyle={{}}
        textCopyStyle={{}}
      />,
    );
    wrapper.children().find('Link').simulate('action', 'address');
    expect(onPressMock).not.toHaveBeenCalledWith('address');
  });
});
