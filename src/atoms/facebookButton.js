import React from 'react';
import Button from './Button';
import {useFacebookButtom} from '.';

const FBLoginButton = props => {
  const {signIn, signUp } = useFacebookButtom(props)
  
  return (
    <Button
      label="Login with Facebook"
      stylect={{ backgroundColor: '#3A8DFA' }}
      action={() => (props.type === 'signin' ? signIn : signUp )}
    />
  );
};
export default FBLoginButton;
