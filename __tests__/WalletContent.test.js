import 'react-native';
import React from 'react';
import Enzyme from 'enzyme';
import { fireEvent, render } from 'react-native-testing-library';
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

it('copy address', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();
  
  const { getByTestId } = render(<WalletContent />);
  fireEvent.press(getByTestId('link'));
  expect(handler).not.toHaveBeenCalled();
});
