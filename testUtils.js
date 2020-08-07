import React from 'react';
import { shallow } from 'enzyme';

export const TestHook = ({ callback }) => {
  callback();
  return null;
};

export const testHook = (callback) => {
  shallow(<TestHook callback={callback} />);
};
