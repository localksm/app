import React from 'react';
import { View } from 'react-native';
import { HomeLayout, AcceptedBuySell } from '../organisms';
import { styleBackground } from '../utils/styles';

const AcceptedBuy = props => {
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <AcceptedBuySell {...props} />
      </View>
    </HomeLayout>
  );
};

export default AcceptedBuy;
