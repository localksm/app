import 'react-native';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MockedProvider } from '@apollo/client/testing';
import renderer, { act } from 'react-test-renderer';
import { WalletContent } from '../src/molecules';
import { QUERIES } from '../src/apollo';

Enzyme.configure({ adapter: new Adapter() });


const mocks = [
  {
    request: {
      query: QUERIES.PUBLIC_KEY,
      variables: {
        id: 1,
        pin: '1234567890',
      },
    },
    result: {
      data: {
        publicKeys: { ksm: '0987654321' },
      },
    },
  },
];

it('should render without error', async () => {
  let useEffect;
  await act(async () => {
    // Testing useEffect
    const mockUseEffect = () => {
      useEffect.mockImplementationOnce((f) => f());
    };
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();

    const { container } = renderer.create(
      <MockedProvider mocks={mocks}>
        <WalletContent
          id={0}
          imageStyle={{}}
          textKeyStyle={{}}
          textCopyStyle={{}}
        />
      </MockedProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
