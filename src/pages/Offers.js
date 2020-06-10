import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OfferList, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';
import { Button } from '../atoms';

const Offers = props => {
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <View style={styles.buttonFilter}>
          <Button
            label="Filter"
            stylect={styles.button}
            action={() => props.navigation.navigate('Filter')}
          />
        </View>
        <OfferList {...props} />
      </View>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  buttonFilter: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingLeft: '70%',
    paddingRight: '8%',
  },
  button: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    height: 30,
    width: 90
  },
});

export default Offers;