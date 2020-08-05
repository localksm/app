import React from 'react';
import { View } from 'react-native';
import { HomeLayout, DisbursementBuyer } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';

const DisburseBuyer = props => {
  backHandlerControl(props);

  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <DisbursementBuyer {...props} />
      </View>
    </HomeLayout>
  );
};

export default DisburseBuyer;
