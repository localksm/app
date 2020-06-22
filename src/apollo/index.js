import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import ls from 'react-native-local-storage';
import { 
  GRAPHQL_ENDPOINT, 
  GRAPHQL_SUBSCRIPTIONS_ENDPOINT 
} from '../utils/config';
import {ContextProvider, ContextConsumer, withContext} from './context';
import ApolloState from './stateManager';
import getNodeType from './nodeHandler';

import { 
  QUERY_PROPOSALS
} from './queries';

import {
  ADD_FUNDS
} from './mutations';

import {
  PROPOSAL_ADDED,
} from './subscriptions';

const httpLink = new HttpLink({
  uri: `${GRAPHQL_ENDPOINT}`,
});

const wsLink = new WebSocketLink({
  uri: `${GRAPHQL_SUBSCRIPTIONS_ENDPOINT}`,
  options: { reconnect: true },
});

export const setSession = async payload => {
  return await ls.save('session', payload);
};

export const getSession = async () => {
  return await ls.get('session');
};

export const removeSession = async () => {
  return await ls.clear();
};


const authLink = setContext(async _ => {
  
  const operationType = _.query.definitions[0].operation;
  const node =
    operationType === 'mutation' ? getNodeType(_.operationName) : null;

  const data = await getSession();
  const {session} = data !== null && data;
  const jwt = session && session.token;

  return {
    headers: {
      authorization: `Bearer ${jwt}`,
      node
    },
  };
});

const httpAuthLink = authLink.concat(httpLink);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  // eslint-disable-next-line no-console
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpAuthLink,
);
export const cache = new InMemoryCache();
export const client =  new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    link,
  ]),
  cache,
  resolvers: {
    logout: async id => {
      await removeSession();
    },
  },
});

export const QUERIES = {
  QUERY_PROPOSALS
};

export const MUTATIONS = {
  ADD_FUNDS
};

export const SUBSCRIPTIONS = {
  PROPOSAL_ADDED
};


export {ContextConsumer, ContextProvider, withContext};

const initialState = {
  session: null,
  offer: null,
  filterData: [],
  navigation: null,
  evidenceImages: null,
  token: null,
};
cache.writeData({data: initialState});

export const state = new ApolloState();