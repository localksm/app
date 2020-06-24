import React, { useState } from 'react';
import { View, Platform, Alert } from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import Button from './Button';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_FACEBOOK, SIGNUP_FACEBOOK } from '../apollo/mutations';
import { sessionModel as session } from '../utils/config';
import { setSession, client } from '../apollo';
import { QUERY_EMAIL } from '../apollo/queries';

validateEmail = async (email, name) => {

    const response = await client.query({
      query: QUERY_EMAIL,
      variables: {
        email: email,
        name: name,
      },
    });
    
    const {emailExists} = response.data.verifyUser;
    return {emailExists};
};



const FBLoginButton = ( props ) => {

    const [loading, setloading] = useState(false);
    const [ loginFacebook ] = useMutation(LOGIN_FACEBOOK);
    const [ signUpFacebook ] = useMutation(SIGNUP_FACEBOOK);

    const mapUser = data => {
    
      session['id'] = data.id;
      session['token'] = data.token;
      session['email'] = data.email;
      session['name'] = data.email;            
      session['__typename'] = data.__typename;
      session['sessionType'] = 'facebook';

      return session;
    };

    const _initUser = async token => {

        const fbResProxy = await fetch(
          'https://graph.facebook.com/v2.5/me?fields=id,name,email&access_token=' +
            token,
        );
    
        const fbRes = await fbResProxy.json();
        const { email, name, id } = fbRes;
        const payload = {
          email: email,
          type: 'facebook',
          userFBID: id,
          token,
          platform: Platform.OS === "ios"? "ios":"android"
        };

        const {emailExists} = await validateEmail(email, name);                
        setloading(true);
        if (!emailExists) {          
          const resultSignUp =await _registerUser(token);
          const { data: { signup }} = resultSignUp;
          if (!signup.success) {
            setloading(false);
            alert("Try later");
            return;
          }
        }
                
        const result = await loginFacebook({ variables: payload });                
        if (result.data) {
            const { data:{ login }} = result;
            const sessionResult = mapUser( login );            
            setloading(false);
            setSession({ session: sessionResult})            
            props.actionLogin();            
        }else{
            setloading(false);
        }
        
      };
    
    const _signIn = async (props) => {        
        const loginManager = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);
    
        if (loginManager.isCancelled) {      
          alert('Login cancelled');
        } else {      
          const data = await AccessToken.getCurrentAccessToken();
          _initUser(data.accessToken.toString());      
        }
    };

    const _signUp = async () => {

        const loginManager = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);
    
        if (loginManager.isCancelled) {          
          alert('Login cancelled');
        } else {          
          const data = await AccessToken.getCurrentAccessToken();
          const sessionResult = await _registerUser(data.accessToken.toString());
          const { data: { signup }} = sessionResult;
          if ( signup.success) {            
            props.actionLogin();
          }
                
        }
    };

    const _registerUser = async token => {
    
        const fbResProxy = await fetch(
          'https://graph.facebook.com/v2.5/me?fields=id,name,email&access_token=' +
            token,
        );
    
        const fbRes = await fbResProxy.json();        
        const {emailExists} = await validateEmail(fbRes.email, fbRes.name);
        if (emailExists) {          
          setloading(false);
          return Alert.alert(
                  'Warning!',
                  'The email of this social network is already registered',
                  [              
                    {text: 'Try again?'},
                  ],
                );
        } else {          
          const payload = {
            name: fbRes.name,
            email: fbRes.email,
            type: 'facebook',
            token,
            userFBID: fbRes.id,
            platform: Platform.OS === "ios"? "ios":"android"
          };
          const result = await signUpFacebook({ variables: payload });
          return result;
        }
            
    };

    return (                    
            <Button
            label="Login with Facebook"
            stylect={{ backgroundColor: '#3A8DFA' }}
            action={() => props.type === 'signin' ? _signIn(props) : _signUp(props) }
            />
    );
}
export default FBLoginButton;
