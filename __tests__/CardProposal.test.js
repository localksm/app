import 'react-native';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, render } from 'react-native-testing-library';

import renderer, { act } from 'react-test-renderer';
import { CardProposal, Card } from '../src/molecules';
import { QUERIES } from '../src/apollo';

Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

const itemMock = {
  status: 'created',
  body: {
    paymentMethod: 'VE',
    usernameMaker: 'Maker',
    updatedAt: '2020-08-07T01:15:45.503Z',
    requestAmount: 0,
    offerAmount: 0,
    offerAsset: 'native',
    requestAsset: 'native',
    operationType: 'buy',
  },
};

const mockErrors = [
  {
    request: {
      query: QUERIES.QUERY_PROPOSALS,
      variables: {
        userId: 1,
      },
    },
    result: {
      errors: [],
    },
  },
];

const mocks = [
  {
    request: {
      query: QUERIES.QUERY_PROPOSALS,
      variables: {
        userId: 1,
      },
    },
    result: {
      data: {
        proposals: [itemMock],
      },
    },
  },
];

it('renders correctly', async () => {
  await act(async () => {
    renderer.create(<CardProposal />);
  });
});

it('press card buy', async () => {
  jest.useFakeTimers();

  const itemMockBuy = {
    status: 'created',
    body: {
      paymentMethod: 'VE',
      usernameMaker: 'Maker',
      updatedAt: '2020-08-07T01:15:45.503Z',
      requestAmount: 0,
      offerAmount: 0,
      offerAsset: 'native',
      requestAsset: 'native',
      operationType: 'buy',
    },
  };

  const handler = jest.fn();

  const { getByTestId } = render(<Card item={itemMockBuy} />);
  fireEvent.press(getByTestId('press-card'));
  expect(handler).not.toHaveBeenCalled();
});

it('press card sell', async () => {
  jest.useFakeTimers();

  const handler = jest.fn();

  const itemMockSell = {
    status: 'created',
    body: {
      paymentMethod: 'VE',
      usernameMaker: 'Maker',
      updatedAt: '2020-08-07T01:15:45.503Z',
      requestAmount: 0,
      offerAmount: 0,
      offerAsset: 'native',
      requestAsset: 'native',
      operationType: 'sell',
    },
  };

  const { getByTestId } = render(<Card item={itemMockSell} />);
  fireEvent.press(getByTestId('press-card'));
  expect(handler).not.toHaveBeenCalled();
});

it('mocks apollo loading', async () => {
  jest.useFakeTimers();

  const wrapper = shallow(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CardProposal />
    </MockedProvider>,
  );

  expect(wrapper).toMatchSnapshot();
});

it('mocks apollo error', async () => {
  jest.useFakeTimers();

  const wrapper = shallow(
    <MockedProvider mocks={mockErrors} addTypename={false}>
      <CardProposal />
    </MockedProvider>,
  );

  expect(wrapper).toMatchSnapshot();
});
