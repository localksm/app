import React from 'react';
import { View } from 'react-native';
import { MediationView, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';

const Mediation = props => {
  backHandlerControl(props);
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <MediationView {...props} />
      </View>
    </HomeLayout>
  );
};

export default Mediation;
