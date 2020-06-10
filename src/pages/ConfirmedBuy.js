import React from 'react';
import { View } from 'react-native';
import { HomeLayout, ConfirmedBuySell } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';

const ConfirmedBuy = props => {
  backHandlerControl(props);
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <ConfirmedBuySell {...props} />
      </View>
    </HomeLayout>
  );
};

export default ConfirmedBuy;
