
export const sessionModel = {
  token: null,
  email: null,
  name: null,
  id: null,
  sessionType: null,
  __typename: null,
};

export const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV == 'development'
    ? 'https://app.localksm.com/'
    : 'https://app.localksm.com/';

export const GRAPHQL_SUBSCRIPTIONS_ENDPOINT =
process.env.NODE_ENV == 'development'
? 'ws://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4041/graphql'
: 'ws://app.localksm.com/graphql';


export const googleConfig = {
  webClientId:
    Platform.OS === 'ios'
      ? '514153515531-srjm0vkiu1va0nmuvkk5kpl2fn1ge6q8.apps.googleusercontent.com'
      : '514153515531-805ps37oc567a0do8fe0rb0lr1c12iap.apps.googleusercontent.com'
      
};

export const twitterConfig = {
  consumer_key: 'wwOBrFV2MyEOG7D0DgibC4vNU',
  consumer_secret: 'd4UrAVZgv7fZYspuMxoBGD9J1RhaieFHtOBSVsOSL2z9VFYDNG',
};