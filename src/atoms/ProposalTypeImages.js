import React from 'react';
import { Image } from 'react-native';
import greenIcon from '../../assets/add.png';
import yellowIcon from '../../assets/withdraw.png';

const ProposalTypeImages = ({ operationType }) => {
  switch (operationType) {
    case 'add_funds':
      return <Image source={greenIcon} />;
    case 'withdraw_funds':
      return <Image source={yellowIcon} />;
    case 'buy':
      return <Image source={greenIcon} />;
    case 'sell':
      return <Image source={yellowIcon} />;
  }
};

export default ProposalTypeImages;
