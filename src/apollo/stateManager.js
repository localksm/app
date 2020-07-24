import React from 'react';
import {client, cache} from '.';
import {
  SESSION,
  OFFER,
  GET_FILTER_RESULT,
  APOLLO_NAVIGATION,
  SELECTED_IMAGES,
  TOKEN,
  GET_BALANCE_KSM
} from './localQueries';

const QUERIES = {
  SESSION,
  OFFER,
  GET_FILTER_RESULT,
  APOLLO_NAVIGATION,
  SELECTED_IMAGES,
  TOKEN,
  GET_BALANCE_KSM
};

const mutation = async (payload, type = null) => {
  // Defautl saves
  await cache.writeData({
          data: payload,
        });
};

const getData = async query => {
  return cache.readQuery({query: QUERIES[query]});
};

export default {
  mutation,
  getData
};

