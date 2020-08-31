import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { ConfirmSentBuyButton } from '../src/atoms';



configure({ adapter: new Adapter() });


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

it('renders correctly', async () => {

  const muckData = {
    proposalId: 1, 
    usernameMaker:"demo jhone"
  };
  
  await act(async () => {
    renderer.create(<ConfirmSentBuyButton
      variables={muckData}
      label="Send"
      />);
  });

});

it('press button', async () => {
    
    const muckData = {
        proposalId: 1, 
        usernameMaker:"demo jhone"
      };

    await act(async () => {
      let wrapper = shallow(
        <ConfirmSentBuyButton
            variables={muckData}
            label="Send"
        />
      );
      wrapper.find('Button').first().dive().simulate('press');
    });
  });