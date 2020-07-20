import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HomeLayout, OfferDetails } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';

const DetailsOffer = props => {
  backHandlerControl(props);
  return (
      <HomeLayout>
        <ScrollView>
          <View style={styleBackground.container}>
            <OfferDetails {...props} />
          </View>
        </ScrollView>
      </HomeLayout>
  );
};

export default DetailsOffer;
