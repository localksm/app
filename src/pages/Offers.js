import React from 'react';
import { View } from 'react-native';
import { OfferList, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';

const Offers = () => {
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <OfferList />
      </View>
    </HomeLayout>
  );
};

export default Offers;
