/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { DropdownCountries } from '../src/atoms';
import { MockedProvider } from '@apollo/react-testing';
import { QUERIES } from '../src/apollo';
import { GraphQLError } from 'graphql';

configure({ adapter: new Adapter() });

const mocks = [
  {
    request: {
      query: QUERIES.COUNTRIES,
      variables: { },      
    },
    result: {
      data: {
        countries: [
          {
            id: 1,
            value: 'Mexico'
          }
        ],
      },
    },
  },
];

const mockErrors = [
  {
    request: {
      query: QUERIES.COUNTRIES,
      variables: { }
    },
    result: {
      errors: [],
    }
  }
];

it('renders correctly', async () => {
  const actionfake = jest.fn();
  await act(async () => {
    renderer.create(<DropdownCountries action={actionfake} />);
  });
});

it('should render loading state initially', async () => {
  await act(async () => {
    jest.useFakeTimers();
    const actionfake = jest.fn();
    const component = renderer.create(
      <MockedProvider mocks={[]}>
        <DropdownCountries action={actionfake} />
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
        <DropdownCountries action={actionfake} />
      </MockedProvider>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});

it('mocks apollo error', async () => {
  await act(async () => {
    jest.useFakeTimers();
    const actionfake = jest.fn();
    const wrapper = renderer.create(
      <MockedProvider mocks={mockErrors} addTypename={false}>
        <DropdownCountries action={actionfake} />
      </MockedProvider>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
