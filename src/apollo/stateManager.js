import React from 'react';
import { client } from '.';


class ApolloState {
  constructor() {
    this.client = client;
  }

  mutation = async (payload, type = null) => {
    // Defautl saves
    this.cache.writeData({
      data: payload,
    });
  };
}

export default ApolloState;