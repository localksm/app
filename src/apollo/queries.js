import {gql} from 'apollo-boost';

export const QUERY_PROPOSALS = gql`
  query proposals($userId: Int, $offset: Int = 0, $limit: Int = 10) {
    proposals(
      userId: $userId
      status: "created"
      offset: $offset
      limit: $limit
    ) {
      id
      hash
      status
      count
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
        requestId
        makerId
        takerId
        makerType
        takerType
        operationType
        offerAsset
        requestAsset
        offerAmount
        requestAmount
        timestamp
        updatedAt
        conditions
        audience
        challengeStake
        juryPool
        paymentMethod
        usernameMaker
        usernameTaker
        toEmail
        updatedAt
        adjudicationId
      }
    }
  }
`;

export const QUERY_USER_PROPOSALS = gql`
  query userProposals($id: Int, $offset: Int = 0, $limit: Int = 10) {
    userProposals(id: $id, offset: $offset, limit: $limit) {
      id
      hash
      status
      count
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
        requestId
        makerId
        takerId
        makerType
        takerType
        operationType
        offerAsset
        requestAsset
        offerAmount
        requestAmount
        timestamp
        conditions
        audience
        challengeStake
        juryPool
        paymentMethod
        usernameMaker
        usernameTaker
        from
        to
        toEmail
        remittanceSuccess
        fromUsername
        toUsername
        updatedAt
        adjudicationId
      }
    }
  }
`;

export const QUERY_ACCEPTANCES = gql`
  query($requestId: String) {
    proposal(id: $requestId) {
      body {
        makerId
      }
      acceptances {
        uuid
      }
    }
  }
`;

export const QUERY_COUNTRIES = gql`
  query {
    countries {
      id
      value
    }
  }
`;

export const QUERY_PAYMENT_METHODS = gql`
  query {
    paymentMethods {
      id
      value
    }
  }
`;

export const QUERY_EMAIL = gql`
  query verifyUser($email: String, $name: String) {
    verifyUser(email: $email, name: $name) {
      emailExists
      nameExists
    }
  }
`;

export const QUERY_STELLAR_PUBLIC_KEY = gql`
  query stellarPublicKey($userId: Int) {
    stellarPublicKey(id: $userId) {
      publicKey
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

export const QUERY_EXCHANGERATES = gql`
  query getExchangeRates($currencyCodeString: String) {
    getCurrencyExchangeRates(currencyCode: $currencyCodeString) {
      fromCurrencyCode
      fromCurrencyName
      toCurrencyCode
      toCurrencyName
      exchangeRate
      lastRefreshed
      timeZone
      bidPrice
      askPrice
    }
  }
`;
export const QUERY_FILTER = gql`
  query {
    getMinMaxProposals {
      min
      max
    }
  }
`;

export const QUERY_APPLY_FILTER = gql`
  query filterProposalsByAmount(
    $low: Float
    $high: Float
    $order: Order!
    $paymentMethod: PaymentMethods!
    $chain: Chains!
  ) {
    filterProposalsByAmount(
      low: $low
      high: $high
      order: $order
      paymentMethod: $paymentMethod
      chain: $chain
    ) {
      id
      localCurrency
      hash
      status
      body {
        makerId
        takerId
        offerAsset
        offerAmount
        requestAmount
        requestAsset
        timestamp
        conditions
        audience
        challengeStake
        juryPool
        paymentMethod
        chain
        makerType
        takerType
        operationType
        usernameMaker
        usernameTaker
        from
        to
        remittanceSuccess
        requestId
        fromUsername
        toUsername
      }
    }
  }
`;

export const QUERY_CURRENCIES = gql`
  query {
    currencies {
      id
      label
    }
  }
`;

export const QUERY_EXCHANGE_CURRENCIES = gql`
  query {
    exchangeCurrencies {
      id
      label
    }
  }
`;

export const QUERY_PROPOSAL_PAYMENT_METHOD = gql`
  query proposalPaymentMethod($proposal_id: Int) {
    proposalPaymentMethod(proposal_id: $proposal_id) {
      id
      userId
      proposalId
      name
      email
      lastName
      address
      phone
      bankData
      accountNumber
      type
      country
    }
  }
`;

export const QUERY_RULING = gql`
  query ruling($id: Int) {
    ruling(id: $id) {
      favor
      justification
    }
  }
`;

export const QUERY_PUBLIC_KEYS = gql`
  query publicKeys($id: Int!) {
    publicKeys(id: $id) {
      celo
      stellar
    }
  }
`;
