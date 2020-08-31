/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import { fireEvent, render } from 'react-native-testing-library';
import Adapter from 'enzyme-adapter-react-16';
import { SendAdjudicationButton } from '../src/atoms';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(
      <SendAdjudicationButton
        variables={{ proposalId: 0, galleryImages: ['image'], description: '' }}
        navigation={{ navigate: () => {} }}
      />,
    );
  });
});

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    const wrapper = shallow(
      <SendAdjudicationButton
        variables={{ proposalId: 0, galleryImages: [], description: '' }}
        navigation={{ navigate: () => {} }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

it('testing useEffect', async () => {
  let useEffect;
  await act(async () => {
    const mockUseEffect = () => {
      useEffect.mockImplementationOnce((f) => f());
    };
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
  });
});

it('open drawer', async () => {
  jest.useFakeTimers();
  const openHandler = jest.fn();

  const { getByTestId } = render(
    <SendAdjudicationButton
      variables={{ proposalId: 0, galleryImages: ['image'], description: '' }}
      navigation={{ navigate: () => {} }}
    />,
  );
  fireEvent.press(getByTestId('test-btn'));
  expect(openHandler).not.toHaveBeenCalled();
});

it('press button', async () => {
  jest.useFakeTimers();
  const openHandler = jest.fn();
  await act(async () => {
    let wrapper = shallow(
      <SendAdjudicationButton
        variables={{ proposalId: 0, galleryImages: [], description: 'test test' }}
        navigation={{ navigate: () => {} }}
      />
    );
    wrapper.find('Button').first().dive().simulate('press');
  });
  
});
