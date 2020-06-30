
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
    ? 'http://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4041'
    : 'http://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4041';

export const GRAPHQL_SUBSCRIPTIONS_ENDPOINT =
process.env.NODE_ENV == 'development'
? 'ws://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4040/graphql'
: 'ws://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4040/graphql';


export const googleConfig = {
  webClientId:
    Platform.OS === 'ios'
      ? '514153515531-0jvo61789c0egbqupqjt0log2kq33kck.apps.googleusercontent.com'
      : '514153515531-0hos00aong5embcokuo73po0e303v9t5.apps.googleusercontent.com'
      
};

export const twitterConfig = {
  consumer_key: '61vg7Wc3E8SDjOSZsKdJpDBh1',
  consumer_secret: 'ZFoOPW3VLOdbtGA03GxmzYZFS0TSITKtJCk9pqrhfUlTjK1OtX',
};