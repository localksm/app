import 'react-native';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import renderer, { act } from 'react-test-renderer';
import { CardProposal } from '../src/molecules';

Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

it('renders correctly', async () => {
  await act(async () => {
    renderer.create(<CardProposal />);
  });
});
