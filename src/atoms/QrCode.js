import React from 'react';
import QRCode from 'react-native-qrcode-svg';

export default ({ key }) => (
  <QRCode
    value={key !== null ? key : 'No Address'}
    size={156}
    logo={require('../../assets/logoWhite.png')}
    logoBackgroundColor="#cc5741"
    logoSize={40}
    logoBorderRadius={50}
  />
);
