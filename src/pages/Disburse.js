import React from 'react';
import { View } from 'react-native';
import { HomeLayout, DisburseBuy } from '../organisms';
import { styleBackground } from '../utils/styles';

const Disburse = props => {
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <DisburseBuy {...props} />
      </View>
    </HomeLayout>
  );
};

export default Disburse;
