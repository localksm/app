import {
  JWT_SECRET,
  GOOGLE_IOS_KEY,
  GOOGLE_ANDROID_KEY,
  TW_CONSUMER_KEY,
  TW_CONSUMER_SECRET,
} from '@env';
import { Platform } from 'react-native';

export const ENV_VARS = { JWT_SECRET };

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
    ? 'http://ec2-3-16-152-82.us-east-2.compute.amazonaws.com:4041/'
    : 'http://ec2-3-16-152-82.us-east-2.compute.amazonaws.com:4041/';

export const GRAPHQL_SUBSCRIPTIONS_ENDPOINT =
  process.env.NODE_ENV == 'development'
    ? 'ws://ec2-3-16-152-82.us-east-2.compute.amazonaws.com:4041/graphql'
    : 'ws://app.localksm.com/graphql';

export const googleConfig = {
  webClientId: Platform.OS === 'ios' ? GOOGLE_IOS_KEY : GOOGLE_ANDROID_KEY,
};

export const twitterConfig = {
  consumer_key: TW_CONSUMER_KEY,
  consumer_secret: TW_CONSUMER_SECRET,
};
