import {gql} from 'apollo-boost';

export const QUERY_EMAIL = gql`
  query verifyUser($email: String, $name: String) {
    verifyUser(email: $email, name: $name) {
      emailExists
      nameExists
    }
  }
`;