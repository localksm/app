import { gql } from 'apollo-boost';

export const SIGNUP = gql`
  mutation signup(
    $name: String!
    $email: String!
    $type: SessionType!
    $token: String
    $userFBID: String
    $password: String
    $platform: Platform!
  ) {
    signup(
      name: $name
      password: $password
      email: $email
      type: $type
      token: $token
      userFBID: $userFBID
      platform: $platform
    ) {
      success
      error
      userId
    }
  }`;

export const LOGIN = gql`
  mutation login(
    $email: String!
    $password: String
    $type: SessionType!
    $token: String
    $userFBID: String
    $platform: Platform
  ) {
    login(
      email: $email
      password: $password
      type: $type
      token: $token
      userFBID: $userFBID
      platform: $platform
    ) {
      id
      email
      token
      success
      error
      name
    }
  }
`;

export const ADD_FUNDS = gql`
  mutation addFunds(
    $makerId: Int
    $offerAsset: String
    $offerAmount: Float
    $requestAsset: String
    $requestAmount: Float
    $timestamp: String
    $juryPool: String
    $challengeStake: Float
    $paymentMethod: PaymentMethods!
    $localCurrency: CurrencyEnum
    $node: NodeTypes!
  ) {
    addFunds(
      makerId: $makerId
      offerAsset: $offerAsset
      offerAmount: $offerAmount
      requestAsset: $requestAsset
      requestAmount: $requestAmount
      timestamp: $timestamp
      juryPool: $juryPool
      challengeStake: $challengeStake
      paymentMethod: $paymentMethod
      localCurrency: $localCurrency
      node: $node
    ) {
      id
      hash
    }
  }
`;
