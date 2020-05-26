import React from 'react';
import { View } from 'react-native';
import { FormCreateOfferSell, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';

const CreateOfferSell = () => {
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <FormCreateOfferSell />
      </View>
    </HomeLayout>
  );
};

export default CreateOfferSell;
