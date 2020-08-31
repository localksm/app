/**
 * @format
 */

import 'react-native';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer, { act } from 'react-test-renderer';
import { DropdownCurrencies } from '../src/atoms';
import { QUERIES } from '../src/apollo';
import { MockedProvider } from '@apollo/react-testing';

Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

const mocks = [
  {
    request: {
      query: QUERIES.CURRENCIES,
      variables: { },      
    },
    result: {
      data: {
        currencies: [
          {
            id: 1,
            label: 'Mexico'
          }
        ],
      },
    },
  },
];

it('renders correctly', async () => {
  const actionfake = jest.fn();
  await act(async () => {
    renderer.create(<DropdownCurrencies action={actionfake} />);
  });
});

it('should render loading state initially', async () => {
  await act(async () => {
    jest.useFakeTimers();
    const actionfake = jest.fn();
    const component = renderer.create(
      <MockedProvider mocks={[]}>
        <DropdownCurrencies action={actionfake} />
      </MockedProvider>,
    );
  });
});

it('mocks apollo data', async () => {
  await act(async () => {
    jest.useFakeTimers();
    const actionfake = jest.fn();
    const wrapper = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DropdownCurrencies action={actionfake} />
      </MockedProvider>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
