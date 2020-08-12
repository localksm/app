import 'react-native';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Wallet } from '../src/pages';
import { testHook } from '../testUtils';
import { useSetSelect } from '../src/utils/hooks';
import { WalletSwitch, WalletViewButton } from '../src/molecules';

configure({ adapter: new Adapter() });

describe('Wallet', () => {
  it('renders correctly', async () => {
    jest.useFakeTimers();
    await act(() => {
      shallow(<Wallet />);
    });
  });

  describe('WalletViewButton', () => {
    it('renders [select]', async () => {
      jest.useFakeTimers();
      const handleSelect = jest.fn();
      await act(() => {
        shallow(<WalletViewButton select={true} handleSelect={handleSelect} />);
      });
    });

    it('renders [!select]', async () => {
      jest.useFakeTimers();
      const handleSelect = jest.fn();
      await act(() => {
        shallow(
          <WalletViewButton select={false} handleSelect={handleSelect} />,
        );
      });
    });

    it('clic deposit', async () => {
      jest.useFakeTimers();
      const handleSelect = jest.fn();
      const wrapper = shallow(
        <WalletViewButton select={true} handleSelect={handleSelect} />,
      );
      wrapper.find('Button').at(0).dive().simulate('press');
      expect(handleSelect.mock.calls).toEqual([[false]]);
    });

    it('clic withdraw', async () => {
      jest.useFakeTimers();
      const handleSelect = jest.fn();
      const wrapper = shallow(
        <WalletViewButton select={true} handleSelect={handleSelect} />,
      );
      wrapper.find('Button').at(1).dive().simulate('press');
      expect(handleSelect.mock.calls).toEqual([[true]]);
    });
  });

  describe('WalletSwitch', () => {
    it('renders correctly', async () => {
      jest.useFakeTimers();
      const handleSelect = jest.fn();
      await act(() => {
        shallow(<WalletSwitch handleSelect={handleSelect} />);
      });
    });

    it('renders select', async () => {
      jest.useFakeTimers();
      const handleSelect = jest.fn();
      await act(() => {
        shallow(<WalletSwitch select={true} handleSelect={handleSelect} />);
      });
    });

    it('renders !select', async () => {
      jest.useFakeTimers();
      const handleSelect = jest.fn();
      await act(() => {
        shallow(<WalletSwitch select={false} handleSelect={handleSelect} />);
      });
    });
  });
});
