import {gql} from 'apollo-boost';

export const PROPOSAL_ADDED = gql`
  subscription {
    proposalAdded {
      id
      body {
        makerId
      }
    }
  }
`;

export const USER_BALANCE_SUBSCRIPTION = gql`
  subscription userBalanceChanged($id: Int) {
    userBalanceChanged(id: $id) {
      balance
    }
  }
`;

export const BALANCE_TRACKER = gql`
  subscription($id: Int) {
    balanceTracker(id: $id) {
      id
      from
      to
      amount
      success
      type
    }
  }
`;

export const SESSION_HAS_CHANGED = gql`
  subscription {
    authHasChanged {
      tokenIsValid
    }
  }
`;
