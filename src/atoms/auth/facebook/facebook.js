import React from 'react';
import { View, Platform } from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import Button from '../../Button';


validateEmail = async (email, name) => {
    /*const response = await client.query({
      query: QUERY_EMAIL,
      variables: {
        email: email,
        name: name,
      },
    });
    const {emailExists} = response.data.verifyUser;

    return {emailExists};*/

    return {emailExists:true};
};



const FBLoginButton = ( props ) => {

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
        
    
        console.log(payload);
        props.actionLogin();
        
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
          _registerUser(data.accessToken.toString());
        }
    };

    const _registerUser = async token => {
    
        const fbResProxy = await fetch(
          'https://graph.facebook.com/v2.5/me?fields=id,name,email&access_token=' +
            token,
        );
    
        const fbRes = await fbResProxy.json();
    
        const payload = {
          name: fbRes.email,
          email: fbRes.email,
          type: 'facebook',
          token,
          userFBID: fbRes.id,
          platform: Platform.OS === "ios"? "ios":"android"
        };

        console.log(payload);
        
        /*const {email, name} = payload;
        const {emailExists} = await this.validateEmail(email, name);
        if (emailExists) {
          this.setState({loading: false});
          return Alert.alert(
            'Warning!',
            'The email of this social network is already registered',
            [
              {
                text: 'You want to login?',
                onPress: () => this.props.navigation.navigate('SignIn'),
              },
              {text: 'Try again?'},
            ],
          );
        } else {
          await handleSaveUser(payload);
        }*/
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
