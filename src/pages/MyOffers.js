import React from 'react';
import { View } from 'react-native';
import { MyOffer, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';

const MyOffers = () => {
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <MyOffer />
      </View>
    </HomeLayout>
  );
};

export default MyOffers;