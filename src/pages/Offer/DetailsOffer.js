import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {OfferDetails} from '../../organisms/Offer'
import { HomeLayout } from '../../organisms';


const DetailsOffer = () => {
    return (
      <SafeAreaView>
        <HomeLayout>
          <ScrollView>
            <View style={styles.container}>
                <OfferDetails />
            </View>
          </ScrollView>
        </HomeLayout>
      </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      height: '100%',
    },
  });

export default DetailsOffer;