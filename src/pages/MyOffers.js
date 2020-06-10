import React from 'react';
import { View } from 'react-native';
import { MyOffer, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';

const MyOffers = (props) => {
  backHandlerControl(props);
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <MyOffer />
      </View>
    </HomeLayout>
  );
};

export default MyOffers;