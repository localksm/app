import React from 'react';
import { View } from 'react-native';
import { HomeLayout, MediationResult } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';

const WonMediation = props => {
  backHandlerControl(props);
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <MediationResult {...props} />
      </View>
    </HomeLayout>
  );
};

export default WonMediation;
