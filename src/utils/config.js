
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
      ? '514153515531-0jvo61789c0egbqupqjt0log2kq33kck.apps.googleusercontent.com'
      : '514153515531-0hos00aong5embcokuo73po0e303v9t5.apps.googleusercontent.com'
      
};

export const twitterConfig = {
  consumer_key: 'wwOBrFV2MyEOG7D0DgibC4vNU',
  consumer_secret: 'd4UrAVZgv7fZYspuMxoBGD9J1RhaieFHtOBSVsOSL2z9VFYDNG',
};