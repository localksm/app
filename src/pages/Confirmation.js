import React from 'react';
import { View } from 'react-native';
import { ConfirmationBuySell, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';

const Confirmation = props => {
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <ConfirmationBuySell {...props} />
      </View>
    </HomeLayout>
  );
};

export default Confirmation;
