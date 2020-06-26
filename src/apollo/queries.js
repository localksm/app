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
