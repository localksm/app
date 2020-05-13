import React from 'react';
import {View, StyleSheet, SafeAreaView } from 'react-native';
import { Offer } from '../../molecules/Offer'
import {HomeLayout} from '../index'

const  OfferList = () => {

    return (
        <SafeAreaView>
          <HomeLayout>
            <View style={styles.container}>
              <Offer />
            </View>
          </HomeLayout>
        </SafeAreaView>
    );
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    
  },
  
});

export default OfferList;
