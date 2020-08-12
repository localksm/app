import React from 'react';
import { ScrollView } from 'react-native';
import { WalletView, Withdraw } from '../organisms';

const WalletSwitch = ({ select}) => (
  <ScrollView>{!select ? <WalletView /> : <Withdraw />}</ScrollView>
);

export default WalletSwitch;
