import { gql } from 'apollo-boost';

export const SIGNUP = gql`
  mutation signup(
    $name: String!
    $email: String
    $type: SessionType!
    $token: String
    $userFBID: String
    $password: String
    $platform: Platform!
    $authTokenSecret: String
    $userTWID: String
    $pin: String!
  ) {
    signup(
      name: $name
      password: $password
      email: $email
      type: $type
      token: $token
      userFBID: $userFBID
      platform: $platform
      authTokenSecret: $authTokenSecret
      userTWID: $userTWID
      pin: $pin
    ) {
      success
      error
      userId
    }
  }
`;

export const LOGIN = gql`
  mutation login(
    $email: String
    $name: String
    $password: String
    $type: SessionType!
    $token: String
    $userFBID: String
    $platform: Platform
    $authTokenSecret: String
    $userTWID: String
  ) {
    login(
      name: $name
      email: $email
      password: $password
      type: $type
      token: $token
      userFBID: $userFBID
      platform: $platform
      authTokenSecret: $authTokenSecret
      userTWID: $userTWID
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

export const SEND_ACCEPTANCE = gql`
  mutation sendAcceptance(
    $proposalId: Int!
    $takerId: Int!
    $node: NodeTypes!
  ) {
    sendAcceptance(proposalId: $proposalId, takerId: $takerId, node: $node) {
      id
    }
  }
`;

export const SEND_RESOLUTION = gql`
  mutation sendResolution(
    $proposalId: Int!
    $takerId: Int!
    $node: NodeTypes!
  ) {
    sendResolution(proposalId: $proposalId, takerId: $takerId, node: $node) {
      id
      hash
    }
  }
`;

export const SEND_SELL_RESOLUTION = gql`
  mutation sendResolution(
    $proposalId: Int!
    $takerId: Int!
    $recipientAddress: String
    $node: NodeTypes!
  ) {
    sendResolution(
      proposalId: $proposalId
      takerId: $takerId
      recipientAddress: $recipientAddress
      node: $node
    ) {
      id
      hash
    }
  }
`;

export const SEND_SETTLEMENT = gql`
  mutation sendSettlement(
    $proposalId: Int!
    $makerId: Int!
    $takerId: Int!
    $pin: String!
    $node: NodeTypes!
  ) {
    sendSettlement(
      proposalId: $proposalId
      makerId: $makerId
      takerId: $takerId
      pin: $pin
      node: $node
    ) {
      id
      hash
    }
  }
`;

export const SEND_FULFILLMENT = gql`
  mutation sendFulfillment(
    $proposalId: Int!
    $takerId: Int!
    $node: NodeTypes!
  ) {
    sendFulfillment(proposalId: $proposalId, node: $node, takerId: $takerId) {
      id
    }
  }
`;

export const INSERT_PROPOSAL_PAYMENT_METHOD = gql`
  mutation addPaymentMethod(
    $userId: Int
    $proposalId: Int
    $name: String
    $email: String
    $lastName: String
    $address: String
    $phone: String
    $bankData: String
    $accountNumber: String
    $country: String
    $paymentMethod: PaymentMethods!
  ) {
    addPaymentMethod(
      userId: $userId
      proposalId: $proposalId
      name: $name
      email: $email
      lastName: $lastName
      address: $address
      phone: $phone
      bankData: $bankData
      accountNumber: $accountNumber
      country: $country
      paymentMethod: $paymentMethod
    ) {
      id
    }
  }
`;

export const ADD_FUNDS = gql`
  mutation buy(
    $makerId: Int
    $offerAsset: String
    $offerAmount: Float
    $requestAsset: String
    $requestAmount: Float
    $timestamp: String
    $juryPool: String
    $challengeStake: Float
    $paymentMethod: PaymentMethods!
    $recipientAddress: String
    $localCurrency: CurrencyEnum
  ) {
    buy(
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
      recipientAddress: $recipientAddress
      node: makerSeller
    ) {
      id
      hash
    }
  }
`;

export const CONFIRM_PROPOSAL = gql`
  mutation confirmProposal($proposalId: Int) {
    confirmProposal(proposalId: $proposalId) {
      id
    }
  }
`;

export const SEND_DISBURSEMENT_BUYER = gql`
  mutation sendDisbursementBuyer(
    $proposalId: Int!
    $takerId: Int!
    $pin: String!
    $node: NodeTypes!
    $pin: String!
  ) {
    sendDisbursementBuyer(
      proposalId: $proposalId
      takerId: $takerId
      pin: $pin
      node: $node
      pin: $pin
    ) {
      success
      error
    }
  }
`;

export const SEND_DISBURSEMENT_SELLER = gql`
  mutation sendDisbursementSeller(
    $proposalId: Int!
    $takerId: Int!
    $pin: String!
    $node: NodeTypes!
    $pin: String!
  ) {
    sendDisbursementSeller(
      proposalId: $proposalId
      takerId: $takerId
      pin: $pin
      node: $node
      pin: $pin
    ) {
      success
      error
    }
  }
`;

export const SELL = gql`
  mutation sell(
    $makerId: Int
    $offerAsset: String
    $offerAmount: Float
    $requestAsset: String
    $requestAmount: Float
    $timestamp: String
    $juryPool: String
    $paymentMethod: PaymentMethods!
    $localCurrency: CurrencyEnum
  ) {
    sell(
      makerId: $makerId
      offerAsset: $offerAsset
      offerAmount: $offerAmount
      requestAsset: $requestAsset
      requestAmount: $requestAmount
      timestamp: $timestamp
      juryPool: $juryPool
      paymentMethod: $paymentMethod
      localCurrency: $localCurrency
      node: makerBuyer
    ) {
      id
    }
  }
`;

export const WITHDRAW = gql`
  mutation withdraw($senderId: Int!, $to: String!, $amount: Float!) {
    withdraw(senderId: $senderId, to: $to, amount: $amount) {
      success
      error
    }
  }
`;

export const SEND_ADJUDICATION = gql`
  mutation sendAdjudication(
    $proposalId: Int!
    $images: [String!]
    $createdBy: Int!
    $comment: String!
  ) {
    sendAdjudication(
      proposalId: $proposalId
      images: $images
      node: jury
      createdBy: $createBy
      comment: $comment
    ) {
      id
    }
  }
`;
