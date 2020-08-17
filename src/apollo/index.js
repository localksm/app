import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import ls from 'react-native-local-storage';
import { GRAPHQL_ENDPOINT, ENV_VARS } from '../utils/config';
import { ContextProvider, ContextConsumer, withContext } from './context';
import ApolloState from './stateManager';
import {
  SIGNUP,
  LOGIN,
  ADD_FUNDS,
  CONFIRM_PROPOSAL,
  SEND_ACCEPTANCE,
  SEND_RESOLUTION,
  SEND_SELL_RESOLUTION,
  SEND_SETTLEMENT,
  SEND_FULFILLMENT,
  INSERT_PROPOSAL_PAYMENT_METHOD,
  SEND_DISBURSEMENT_BUYER,
  SEND_DISBURSEMENT_SELLER,
  SELL,
  WITHDRAW,
  SEND_ADJUDICATION,
} from './mutations';
import {
  VERIFY_USER,
  FEE,
  PAYMENT_METHODS,
  CURRENCIES,
  COUNTRIES,
  PUBLIC_KEY,
  QUERY_PROPOSALS,
  QUERY_USER_PROPOSALS,
  VERIFY_PIN,
} from './queries';

const httpLink = new HttpLink({
  uri: `${GRAPHQL_ENDPOINT}`,
  onError: errorLink,
});

export const setSession = async (payload) => {
  return await ls.save('session', payload);
};

export const getSession = async () => {
  return await ls.get('session');
};

export const removeSession = async () => {
  return await ls.clear();
};

const authLink = setContext(async (_) => {
  const data = await getSession();
  const { session } = data !== null && data;
  const jwt = session && session.token;
  const client_key = ENV_VARS.CLIENT_KEY;
  const secret_key = ENV_VARS.SECRET_KEY;

  return {
    headers: {
      authorization: `Bearer ${jwt}`,
      keys: JSON.stringify({ client_key, secret_key }),
    },
  };
});

const httpAuthLink = authLink.concat(httpLink);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations,
        )}, Path: ${path}`,
      ),
    );
  }
  // eslint-disable-next-line no-console
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const cache = new InMemoryCache();
export const client = new ApolloClient({
  link: httpAuthLink,
  cache,
  resolvers: {
    logout: async (id) => {
      await removeSession();
    },
  },
});

export const QUERIES = {
  VERIFY_USER,
  FEE,
  PAYMENT_METHODS,
  COUNTRIES,
  CURRENCIES,
  PUBLIC_KEY,
  QUERY_PROPOSALS,
  QUERY_USER_PROPOSALS,
  VERIFY_PIN,
};

export const MUTATIONS = {
  SIGNUP,
  LOGIN,
  SEND_ACCEPTANCE,
  SEND_RESOLUTION,
  SEND_SELL_RESOLUTION,
  SEND_SETTLEMENT,
  SEND_FULFILLMENT,
  INSERT_PROPOSAL_PAYMENT_METHOD,
  ADD_FUNDS,
  CONFIRM_PROPOSAL,
  SEND_DISBURSEMENT_BUYER,
  SEND_DISBURSEMENT_SELLER,
  SELL,
  WITHDRAW,
  SEND_ADJUDICATION,
};

export const SUBSCRIPTIONS = {};

export { ContextConsumer, ContextProvider, withContext };

const initialState = {
  session: null,
  offer: null,
  filterData: [],
  navigation: null,
  evidenceImages: null,
  token: null,
  polkadot: null,
};
cache.writeData({ data: initialState });

export const state = ApolloState;

export const cleanBalance = async () => {
  await ApolloState.mutation({
    polkadot: {
      balanceKSM: null,
      __typename: null,
    },
  });
};
