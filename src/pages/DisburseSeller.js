import React from 'react';
import { View } from 'react-native';
import { HomeLayout, DisbursementSeller } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';

const DisburseBuyer = props => {
  backHandlerControl(props);

  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <DisbursementSeller {...props} />
      </View>
    </HomeLayout>
  );
};

export default DisburseBuyer;
