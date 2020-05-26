import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HomeLayout, OfferDetails } from '../organisms';
import { styleBackground } from '../utils/styles';

const DetailsOffer = props => {
  return (
    <SafeAreaView>
      <HomeLayout>
        <ScrollView>
          <View style={styleBackground.container}>
            <OfferDetails {...props} />
          </View>
        </ScrollView>
      </HomeLayout>
    </SafeAreaView>
  );
};

export default DetailsOffer;
