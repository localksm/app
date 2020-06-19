import {gql} from 'apollo-boost';

export const ADD_FUNDS = gql`
  mutation addFunds(
    # ProposalData
    $requestId: String
    $makerId: Int
    $offerAsset: String
    $offerAmount: Float
    $requestAsset: String
    $requestAmount: Float
    $timestamp: String
    $conditions: [String]
    $juryPool: String
    $challengeStake: Float
    $audience: [String]
    $paymentMethod: String
    $chain: String
    # PaymentData
    $name: String
    $lastName: String
    $email: String
    $address: String
    $phone: String
    $bankData: String
    $accountNumber: String
    $country: String
    $currency: CurrencyEnum
    $hasRemittance: Boolean
    $remittanceReceiverEmail: String
  ) {
    addFunds(
      # Proposal Data
      requestId: $requestId
      makerId: $makerId
      offerAsset: $offerAsset
      offerAmount: $offerAmount
      requestAsset: $requestAsset
      requestAmount: $requestAmount
      timestamp: $timestamp
      conditions: $conditions
      juryPool: $juryPool
      challengeStake: $challengeStake
      audience: $audience
      paymentMethod: $paymentMethod
      chain: $chain
      # Payment Data
      # Userid = makerId
      name: $name
      lastName: $lastName
      email: $email
      address: $address
      phone: $phone
      bankData: $bankData
      accountNumber: $accountNumber
      country: $country
      localCurrency: $currency
      hasRemittance: $hasRemittance
      remittanceReceiverEmail: $remittanceReceiverEmail
    ) {
      id
      hash
    }
  }
`;

export const WITHDRAW_FUNDS = gql`
  mutation withdrawFunds(
    # ProposalData
    $requestId: String
    $makerId: Int
    $offerAsset: String
    $offerAmount: Float
    $requestAsset: String
    $requestAmount: Float
    $timestamp: String
    $conditions: [String]
    $juryPool: String
    $challengeStake: Float
    $audience: [String]
    $paymentMethod: String
    $chain: String
    # PaymentData
    $name: String
    $lastName: String
    $email: String
    $address: String
    $phone: String
    $bankData: String
    $accountNumber: String
    $country: String
    $currency: CurrencyEnum
  ) {
    withdrawFunds(
      # Proposal Data
      requestId: $requestId
      makerId: $makerId
      offerAsset: $offerAsset
      offerAmount: $offerAmount
      requestAsset: $requestAsset
      requestAmount: $requestAmount
      timestamp: $timestamp
      conditions: $conditions
      juryPool: $juryPool
      challengeStake: $challengeStake
      audience: $audience
      paymentMethod: $paymentMethod
      chain: $chain
      # Payment Data
      # Userid = makerId
      name: $name
      lastName: $lastName
      email: $email
      address: $address
      phone: $phone
      bankData: $bankData
      accountNumber: $accountNumber
      country: $country
      localCurrency: $currency
    ) {
      id
    }
  }
`;

export const DELETE_PROPOSAL = gql`
  mutation deleteProposal($id: Int) {
    deleteProposal(id: $id) {
      id
    }
  }
`;

export const SEND_ACCEPTANCE = gql`
  # Send acceptance
  mutation sendAcceptance(
    $proposalId: Int
    $requestId: String
    $makerId: Int
    $takerId: Int
    $offerAsset: String
    $offerAmount: Float
    $requestAsset: String
    $requestAmount: Float
    $timestamp: String
    $conditions: [String]
    $juryPool: String
    $challengeStake: Float
    $audience: [String]
    $message: String
    $previousHash: String
    $node: String
  ) {
    sendAcceptance(
      proposalId: $proposalId
      requestId: $requestId
      makerId: $makerId
      takerId: $takerId
      offerAsset: $offerAsset
      offerAmount: $offerAmount
      requestAsset: $requestAsset
      requestAmount: $requestAmount
      timestamp: $timestamp
      conditions: $conditions
      juryPool: $juryPool
      challengeStake: $challengeStake
      audience: $audience
      message: $message
      previousHash: $previousHash # Proposal Hash
      node: $node
    ) {
      id
      hash
    }
  }
`;

export const SEND_RESOLUTION = gql`
  # Send resolution
  mutation sendResolution(
    $proposalId: Int
    $requestId: String
    $makerId: Int
    $takerId: Int
    $message: String
    $previousHash: String
    $timestamp: String
    $node: String
  ) {
    sendResolution(
      proposalId: $proposalId
      requestId: $requestId
      makerId: $makerId
      takerId: $takerId
      message: $message
      previousHash: $previousHash
      timestamp: $timestamp
      node: $node
    ) {
      id
      hash
    }
  }
`;

export const SEND_SETTLEMENT = gql`
  # Send settlement
  mutation sendSettlement(
    $proposalId: Int
    $requestId: String
    $makerId: Int
    $takerId: Int
    $message: String
    $previousHash: String
    $timestamp: String
    $type: String
    $chain: String
    $node: String
  ) {
    sendSettlement(
      proposalId: $proposalId
      requestId: $requestId
      makerId: $makerId
      takerId: $takerId
      message: $message
      previousHash: $previousHash
      timestamp: $timestamp
      type: $type
      chain: $chain
      node: $node
    ) {
      id
      hash
    }
  }
`;

export const SEND_FULFILLMENT = gql`
  mutation sendFulfillment(
    $proposalId: Int
    $requestId: String
    $makerId: Int
    $takerId: Int
    $message: String
    $previousHash: String
    $timestamp: String
    $node: String
  ) {
    sendFulfillment(
      proposalId: $proposalId
      requestId: $requestId
      makerId: $makerId
      takerId: $takerId
      message: $message
      previousHash: $previousHash # Acceptance hash
      timestamp: $timestamp
      node: $node
    ) {
      id
      hash
    }
  }
`;

export const INSERT_PROPOSAL_PAYMENT_METHOD = gql`
  mutation addProposalPaymentMethod(
    $userId: Int
    $proposalId: Int
    $name: String
    $email: String
    $lastName: String
    $address: String
    $phone: String
    $bankData: String
    $accountNumber: String
    $type: String
    $country: String
  ) {
    addProposalPaymentMethod(
      userId: $userId
      proposalId: $proposalId
      name: $name
      email: $email
      lastName: $lastName
      address: $address
      phone: $phone
      bankData: $bankData
      accountNumber: $accountNumber
      type: $type
      country: $country
    ) {
      id
    }
  }
`;

export const SEND_FORGOT_PASSWORD = gql`
  mutation sendRecoverPasswordEmail($name: String, $emailReceiver: String) {
    sendRecoverPasswordEmail(name: $name, emailReceiver: $emailReceiver) {
      success
      error
    }
  }
`;

export const SEND_DISBURSEMENT_BUYER = gql`
  mutation sendDisbursementBuyer(
    $proposalId: Int
    $requestId: String
    $chain: String
    $node: String
  ) {
    sendDisbursementBuyer(
      proposalId: $proposalId
      requestId: $requestId
      chain: $chain
      node: $node
    ) {
      success
      error
    }
  }
`;

export const SEND_DISBURSEMENT_SELLER = gql`
  mutation sendDisbursementSeller(
    $proposalId: Int
    $requestId: String
    $chain: String
    $node: String
  ) {
    sendDisbursementSeller(
      proposalId: $proposalId
      requestId: $requestId
      chain: $chain
      node: $node
    ) {
      success
      error
    }
  }
`;

export const SEND_ADD_FUNDS_EMAIL = gql`
  mutation SendAddFundsEmail(
    $name: String
    $emailMaker: String
    $emailReceiver: String
    $amount: Float
    $date: String
  ) {
    sendAddFundsEmail(
      name: $name
      emailMaker: $emailMaker
      emailReceiver: $emailReceiver
      amount: $amount
      date: $date
    ) {
      success
      error
    }
  }
`;

export const SEND_INVITE_TO_REGISTER_EMAIL = gql`
  mutation sendInviteToRegisterEmail(
    $name: String
    $emailMaker: String
    $emailReceiver: String
  ) {
    sendInviteToRegisterEmail(
      name: $name
      emailMaker: $emailMaker
      emailReceiver: $emailReceiver
    ) {
      success
      error
    }
  }
`;

export const SEND_ACCEPT_PROPOSAL_EMAIL = gql`
  mutation sendAcceptProposalEmail(
    $name: String
    $emailMaker: String
    $emailReceiver: String
    $amount: Float
    $local_currency: Float
    $payment_method: String
    $details: String
    $date: String
  ) {
    sendAcceptProposalEmail(
      name: $name
      emailMaker: $emailMaker
      emailReceiver: $emailReceiver
      amount: $amount
      local_currency: $local_currency
      payment_method: $payment_method
      details: $details
      date: $date
    ) {
      success
      error
    }
  }
`;

export const SEND_CONFIRM_EMAIL = gql`
  mutation sendConfirmEmail(
    $name: String
    $emailMaker: String
    $emailReceiver: String
    $amount: Float
    $local_currency: Float
    $payment_method: String
    $details: String
    $date: String
  ) {
    sendConfirmEmail(
      name: $name
      emailMaker: $emailMaker
      emailReceiver: $emailReceiver
      amount: $amount
      local_currency: $local_currency
      payment_method: $payment_method
      details: $details
      date: $date
    ) {
      success
      error
    }
  }
`;

export const SEND_CONFIRM_RECEIVED_MAKER_EMAIL = gql`
  mutation sendConfirmReceivedMakerEmail(
    $name: String
    $emailMaker: String
    $emailReceiver: String
    $amount: Float
    $payment_method: String
    $date: String
  ) {
    sendConfirmReceivedMakerEmail(
      name: $name
      emailMaker: $emailMaker
      emailReceiver: $emailReceiver
      amount: $amount
      payment_method: $payment_method
      date: $date
    ) {
      success
      error
    }
  }
`;

export const SEND_CONFIRM_RECEIVED_TAKER_EMAIL = gql`
  mutation sendConfirmReceivedTakerEmail(
    $name: String
    $emailMaker: String
    $emailReceiver: String
    $amount: Float
    $payment_method: String
    $date: String
  ) {
    sendConfirmReceivedTakerEmail(
      name: $name
      emailMaker: $emailMaker
      emailReceiver: $emailReceiver
      amount: $amount
      payment_method: $payment_method
      date: $date
    ) {
      success
      error
    }
  }
`;

export const SEND_CONFIRM_TRANSACTION_EMAIL = gql`
  mutation sendConfirmTransactionEmail(
    $name: String
    $emailMaker: String
    $emailReceiver: String
    $amount: Float
    $payment_method: String
    $date: String
  ) {
    sendConfirmTransactionEmail(
      name: $name
      emailMaker: $emailMaker
      emailReceiver: $emailReceiver
      amount: $amount
      payment_method: $payment_method
      date: $date
    ) {
      success
      error
    }
  }
`;

export const SEND_ADJUDICATION = gql`
  mutation sendAdjudication(
    $requestId: String
    $proposalId: Int
    $images: [String]
    $comment: String
    $node: String
    $createdBy: Int
  ) {
    sendAdjudication(
      requestId: $requestId
      proposalId: $proposalId
      images: $images
      comment: $comment
      node: $node
      createdBy: $createdBy
    ) {
      id
    }
  }
`;

export const SEND_REMITTANCE = gql`
  mutation sendRemittance(
    $senderId: Int
    $receiverEmail: String
    $asset: String
    $amount: Float
  ) {
    sendRemittance(
      senderId: $senderId
      receiverEmail: $receiverEmail
      asset: $asset
      amount: $amount
    ) {
      success
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

export const ADD_EVIDENCE = gql`
  mutation addEvidence(
    $proposalId: Int!
    $userId: Int!
    $images: [String!]
    $comment: String
  ) {
    addEvidence(
      proposalId: $proposalId
      userId: $userId
      comment: $comment
      images: $images
    ) {
      added
    }
  }
`;
