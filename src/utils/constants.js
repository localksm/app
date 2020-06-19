export const traderData = [
    {
      key: 1,
      title: 'Trade with crypto currencies and fiat',
      text: 'Review the list of the available offers.',
      image: require('../../assets/onboarding/Trader001.png')      
    },
    {
      key: 2,
      title: 'Fund your wallet',
      text: 'Fund your account by sending crypto to the address listed in the wallet section.',
      image: require('../../assets/onboarding/Trader002.png')      
    },
    {
      key: 3,
      title: 'Find your match',
      text: 'Filter the offers according to your preferred local currency and payment method.',
      image: require('../../assets/onboarding/Trader003.png')      
    },
    {
        key: 4,
        title: 'Receive the specified amount',
        text: 'Receive the money in your local currency using an external payment method.',
        image: require('../../assets/onboarding/Trader004.png')        
    },
    {
        key: 5,
        title: 'Your new balance will be reflected in your account.',
        text: 'Make money and continue trading.',
        image: require('../../assets/onboarding/Trader005.png')        
    }
  ];

export const UserData = [
    {
      key: 1,
      title: 'Send and receive money anywhere',
      text: 'Enter the email of the person you want to send money to.',
      image: require('../../assets/onboarding/User001.png')      
    },
    {
      key: 2,
      title: 'Your transfer will be made with the help of a trader',
      text: "Wait until a trader accepts your offer. We'll find a match for you. ",
      image: require('../../assets/onboarding/User002.png')      
    },
    {
      key: 3,
      title: 'Send the specified amount to the trader',
      text: 'Send the money in your local currency using an external payment method.',
      image: require('../../assets/onboarding/User003.png')      
    },
    {
      key: 4,
      title: "The money is sent to the receiver's account.",
      text: 'The receiver can withdraw it in their local currency.',
      image: require('../../assets/onboarding/User004.png')      
    },
  ];

  export const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV == 'development'
    ? 'http://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4040'
    : 'http://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4040';

export const GRAPHQL_SUBSCRIPTIONS_ENDPOINT =
  process.env.NODE_ENV == 'development'
    ? 'ws://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4040/graphql'
    : 'ws://ec2-3-133-85-207.us-east-2.compute.amazonaws.com:4040/graphql';
    