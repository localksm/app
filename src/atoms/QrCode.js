import React from 'react';
import QRCode from 'react-native-qrcode-svg';

export default function QrWallet(props){ 
  const{value} = props
  return(
    <QRCode
      value={value !== null ? value : 'No Address'}
      size={200}
      color='#ffffff'
      backgroundColor='#2D2D2D'
      logo={require('../../assets/logoWhite.png')}
      logoBackgroundColor="#cc5741"
      logoSize={40}
      logoBorderRadius={50}
    />
  
  )
  };
