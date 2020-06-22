
export const sessionModel = {
  token: null,
  email: null,
  name: null,
  id: null,
  photo: null,
  sessionType: null,
  balance: null,
  __typename: null,
};

export const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV == 'development'
    ? 'http://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4040'
    : 'http://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4040';

export const GRAPHQL_SUBSCRIPTIONS_ENDPOINT =
process.env.NODE_ENV == 'development'
? 'ws://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4040/graphql'
: 'ws://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4040/graphql';