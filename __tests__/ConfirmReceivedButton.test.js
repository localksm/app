import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { ConfirmReceivedButton } from '../src/atoms';



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
    takerId:1, 
    operationType:'add_funds', 
    pin:'555555', 
    disbursed:''
  };
  
  await act(async () => {
    renderer.create(<ConfirmReceivedButton
      variables={muckData}
      label="Send"      
      />);
  });

});