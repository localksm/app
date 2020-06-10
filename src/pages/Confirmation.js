import React from 'react';
import { View } from 'react-native';
import { ConfirmationBuySell, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';

const Confirmation = props => {
  backHandlerControl(props);
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <ConfirmationBuySell {...props} />
      </View>
    </HomeLayout>
  );
};

export default Confirmation;
