import {gql} from 'apollo-boost';

export const LOGIN_FACEBOOK = gql`
  mutation login(
    $email: String!,  
    $type:  SessionType!,
    $token: String,
    $userFBID: String,
    $platform: Platform
  ){
    login( email: $email, type: $type, token: $token, userFBID: $userFBID, platform: $platform  ){
      id
      email
      token
      success
      error
    }
  }`;

export const SIGNUP_FACEBOOK = gql `
  mutation signup(
    $name: String!,
    $email: String!,  
    $type:  SessionType!,
    $token: String,
    $userFBID: String,
    $platform: Platform
  ){
    signup( name: $name, email: $email, type: $type, token: $token, userFBID: $userFBID, platform: $platform  ){      
      success
      error
      userId
    }
  }
`;