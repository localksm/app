import { gql } from 'apollo-boost';

export const VERIFY_USER = gql`
query verifyUser($email: String, $name: String ){
   verifyUser(email: $email, name: $name){
       email
       nameExists
       emailExists
     }
   }
 `;

export const FEE = gql`
  query {
    fees {
      fee
      amount
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
  query porposals($userId: Int, $offset: Int = 0, $limit: Int = 100) {
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
        paymentMethod
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


  export const QUERY_USER_PROPOSALS = gql`
  query userProposals($id: Int, $limit: Int = 100,$offset: Int = 0 ) {
      userProposals(id:$id limit:$limit offset:$offset ){ 
          id
          hash
          status
          count
          localCurrency
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
              paymentMethod
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
  }
  `;
