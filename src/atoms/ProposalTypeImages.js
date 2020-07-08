import React from 'react';
import { Image } from 'react-native';
import greenIcon from '../../assets/add.png';
import yellowIcon from '../../assets/withdraw.png';

const ProposalTypeImages = ({ operationType }) => {
  switch (operationType) {
    case 'add_funds':
      return <Image resizeMethod="resize" style={{ width: 30, height: 30 }}  source={greenIcon} />;
    case 'withdraw_funds':
      return <Image resizeMethod="resize" style={{ width: 30, height: 30 }} source={yellowIcon} />;
    case 'buy':
      return <Image resizeMethod="resize" style={{ width: 30, height: 30 }} source={greenIcon} />;
    case 'sell':
      return <Image resizeMethod="resize" style={{ width: 30, height: 30 }} source={yellowIcon} />;
  }
};

export default ProposalTypeImages;
