/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import { ProposalTypeImages } from '../src/atoms';

configure({ adapter: new Adapter() });

jest.mock('../assets/add.png');
jest.mock('../assets/withdraw.png');

it('renders buy correctly', () => {
  renderer.create(<ProposalTypeImages operationType="buy" />);
});

it('renders add_funds correctly', () => {
  renderer.create(<ProposalTypeImages operationType="add_funds" />);
});

it('renders sell correctly', () => {
  renderer.create(<ProposalTypeImages operationType="sell" />);
});

it('renders withdraw_funds correctly', () => {
  renderer.create(<ProposalTypeImages operationType="withdraw_funds" />);
});
