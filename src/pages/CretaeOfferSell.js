import React from 'react';
import { View } from 'react-native';
import { FormCreateOfferSell, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';

const CreateOfferSell = (props) => {
  backHandlerControl(props);
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <FormCreateOfferSell />
      </View>
    </HomeLayout>
  );
};

export default CreateOfferSell;
