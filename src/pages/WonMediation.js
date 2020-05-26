import React from 'react';
import { View } from 'react-native';
import { HomeLayout, MediationResult } from '../organisms';
import { styleBackground } from '../utils/styles';

const WonMediation = props => {
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <MediationResult {...props} />
      </View>
    </HomeLayout>
  );
};

export default WonMediation;
