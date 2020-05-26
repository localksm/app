import React from 'react';
import { View } from 'react-native';
import { FormCreateOfferBuy, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';

const CreateOfferBuy = () => {
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <FormCreateOfferBuy />
      </View>
    </HomeLayout>
  );
};

export default CreateOfferBuy;
