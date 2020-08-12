/**
 * @format
 */

import 'react-native';
import React from 'react';
import { configure, shallow } from 'enzyme';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, render } from 'react-native-testing-library';

import { Report, ReportContent } from '../src/organisms';

configure({ adapter: new Adapter() });

const mockParams = {
  params: {
    body: {
      usernameMaker: 'maker',
      offerAsset: 'native',
      offerAmount: 0,
      paymentMethod: 'VE',
      operationType: 'buy',
      paymentData: {
        accountNumber: 'accountNumber',
        address: 'address',
        bankData: '12345',
        email: 'email',
        lastName: 'lastName',
        name: 'name',
        phone: '',
        proposalId: 1,
      },
    },
  },
};

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<Report route={mockParams} />);
  });
});



it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(<ReportContent showImages route={mockParams} />);
  });
});

it('renders correctly', async () => {
  jest.useFakeTimers();
  await renderer.act(() => {
    renderer.create(
      <ReportContent
        route={mockParams}
        variables={{
          proposalId: 1,
          galleryImages: [],
          descriptions: '',
        }}
      />,
    );
  });
});

it('test send to won mediation screen on press', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();

  const { getByTestId } = render(
    <ReportContent showImages route={mockParams} setShowImages={() => {}} />,
  );

  fireEvent.press(getByTestId('show-img-btn'));
  expect(handler).not.toHaveBeenCalled();
});

it('test send to won mediation screen on press', async () => {
  jest.useFakeTimers();
  const handler = jest.fn();

  const { getByTestId } = render(
    <ReportContent
      chosenItemsCount={1}
      variables={{
        proposalId: 1,
        galleryImages: [],
        descriptions: '',
      }}
      route={mockParams}
      setShowImages={() => {}}
    />,
  );

  fireEvent.press(getByTestId('show-img-btn'));
  expect(handler).not.toHaveBeenCalled();
});

