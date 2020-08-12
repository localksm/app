import 'react-native';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, render } from 'react-native-testing-library';

import { OnboardingImage } from '../src/organisms';
import { OnboardingImageItem } from '../src/molecules';
import {
  OnboardingDoneButton,
  OnboardingSkipButton,
  OnboardingNextButton,
} from '../src/atoms';

configure({ adapter: new Adapter() });

it('renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<OnboardingImage />);
  });
});

it('OnboardingImageItem renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<OnboardingImageItem item={{ image: '', text: '' }} />);
  });
});

it('OnboardingDoneButton renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<OnboardingDoneButton />);
  });
});

it('OnboardingDoneButton renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<OnboardingDoneButton />);
  });
});

it('OnboardingSkipButton renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<OnboardingSkipButton />);
  });
});

it('OnboardingNextButton renders correctly', async () => {
  jest.useFakeTimers();
  await act(() => {
    create(<OnboardingNextButton />);
  });
});

it('test on press', async () => {
  jest.useFakeTimers();
  const wrapper = shallow(<OnboardingImage />);
  wrapper.find('AppIntroSlider').props().onDone();
});

it('test on press', async () => {
  jest.useFakeTimers();
  const wrapper = shallow(<OnboardingImage />);
  wrapper.find('AppIntroSlider').props().onSkip();
});
