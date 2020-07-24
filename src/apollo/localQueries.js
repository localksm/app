import {gql} from 'apollo-boost';

export const SESSION = gql`
  query GetSessionValue {
    session @client {
      token
      email
      name
      balance
      id
      photo
      sessionType
    }
  }
`;

export const OFFER = gql`
  query GetOfferValue {
    offer @client {
      id
      status
      hash
      localCurrency
      body {
        paymentData {
          country
          email
          userId
          proposalId
          name
          lastName
          address
          phone
          bankData
          accountNumber
          type
        }
        makerId
        takerId
        makerType
        takerType
        operationType
        requestId
        requestAsset
        offerAsset
        requestAmount
        offerAmount
        timestamp
        paymentMethod
        usernameMaker
        usernameTaker
        toEmail
        adjudicationId
      }
    }
  }
`;

export const GET_FILTER_RESULT = gql`
  query GetFilterData {
    filterData @client {
      rangeLow
      rangeHigh
      order
    }
  }
`;

export const APOLLO_NAVIGATION = gql`
  query GetNavigation {
    navigation @client {
      navigate
    }
  }
`;

export const SELECTED_IMAGES = gql`
  query GetImges {
    evidenceImages @client {
      images
    }
  }
`;

export const TOKEN = gql`
  query GetToken {
    token @client {
      jwt
    }
  }
`;

export const GET_BALANCE_KSM = gql`
  query GetBalanceKSM {
    polkadot @client {
      balanceKSM
    }
  }
`;