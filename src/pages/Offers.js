import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { OfferList, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerOffer } from '../utils/backHandlerControl'
import { Button } from '../atoms';

const Offers = props => {
  backHandlerOffer(props)
  return (
    <HomeLayout 
      rightChildren={
        <View style={styles.buttonFilter}>
          <Button
            label="Filter"
            stylect={styles.button}
            action={() => props.navigation.navigate('Filter')}
          />
        </View>
      }>
      <View style={styleBackground.container}>       
        <OfferList {...props} />
      </View>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  buttonFilter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: '8%'
  },
  button: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    height: 30,
    width: 90,
  },
});

export default Offers;
