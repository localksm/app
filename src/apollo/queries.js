import { gql } from 'apollo-boost';

export const QUERY_EMAIL = gql`
  query verifyUser($email: String, $name: String) {
    verifyUser(email: $email, name: $name) {
      emailExists
      nameExists
    }
  }
`;

export const PAYMENT_METHODS = gql`
  query {
    paymentMethods {
      id
      value
    }
  }
`;

export const CURRENCIES = gql`
  query {
    currencies {
      id
      label
    }
  }
`;

export const COUNTRIES = gql`
  query {
    countries {
      id
      value
    }
  }
`;

export const PUBLIC_KEY = gql`
  query publicKeys($id: Int!) {
    publicKeys(id:$id){
      ksm
    }
  }
`;

export const QUERY_PROPOSALS = gql`
  query porposals($userId: Int, $offset: Int = 0, $limit: Int = 10) {
    proposals(
      userId: $userId
      offset: $offset
      limit: $limit
    ) {
      id
      status
      body {
        usernameMaker
        usernameTaker
        updatedAt
        requestId
        operationType
        makerId
        takerId
        offerAsset
        offerAmount
        requestAsset
        requestAmount
        paymentData {
          proposalId
          name
          lastName
          email
          address
          phone
          bankData
          accountNumber
          type
          country
        }
      }
    }
  }`;
