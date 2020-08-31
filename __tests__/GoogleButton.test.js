/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { GoogleButton } from '../src/atoms';


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
  
  await act(async () => {
    renderer.create(<GoogleButton      
      label="Send"
      actionPin={jest.fn()}
      actionLogin={jest.fn()}
      stylect={{}}
      />);
  });

});

it('clic send - correct data', async () => {

  await act(async () => {
    let wrapper = shallow(<GoogleButton      
      label="Send"
      actionPin={jest.fn()}
      actionLogin={jest.fn()}
      stylect={{}}
      />);
     wrapper.find('Button').first().dive().simulate('press');;
     
  });

});
