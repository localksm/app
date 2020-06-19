import React from 'react';
import {client, cache} from '.';
import {
  SESSION,
  OFFER,
  GET_FILTER_RESULT,
  APOLLO_NAVIGATION,
  SELECTED_IMAGES,
  TOKEN,
} from './localQueries';

const QUERIES = {
  SESSION,
  OFFER,
  GET_FILTER_RESULT,
  APOLLO_NAVIGATION,
  SELECTED_IMAGES,
  TOKEN,
};

class ApolloState {
  constructor() {
    this.client = client;
    this.cache = cache;
    this.queries = QUERIES;
  }

  navigation = null;

  dispatch = async (payload, type = null) => {
    // Defautl saves
    this.cache.writeData({
      data: payload,
    });
  };

  getData = async query => {
    return cache.readQuery({query: this.queries[query]});
  };
}

export default ApolloState;
