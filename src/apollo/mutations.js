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

export const SEND_ACCEPTANCE = gql`
  mutation sendAcceptance($proposalId: Int!){    
     sendAcceptance(   
       proposalId: $proposalId
       node: takerBuyer
    ) {
             id    
      }  
  }
`;

export const SEND_RESOLUTION = gql`
  mutation sendResolution($proposalId: Int! $takerId:Int!){    
    sendResolution( 
      proposalId: $proposalId
      takerId: $takerId
      node: makerSeller
    ) 
    {      
      id
      hash
    } 
  }
`;

export const SEND_SETTLEMENT =gql`
  mutation sendSettlement(
    $proposalId: Int!
    $makerId: Int!
    $takerId: Int!
  ) {
    sendSettlement(
      proposalId: $proposalId
      makerId: $makerId
      takerId: $takerId
      node: takerBuyer
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
  ){  
    sendFulfillment(
      proposalId: $proposalId
      node: takerBuyer
      takerId: $takerId
      ){ 
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
  ){
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
  ){
    id
  }
}`;

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


export const CONFIRM_PROPOSAL = gql`
mutation confirmProposal($proposalId: Int) {
  confirmProposal(proposalId: $proposalId){
    id
  }
}

`;
