import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FooterWhite } from '../molecules';
import {Button} from '../atoms'

const MediationResult = props => {
  const username = 'Tom';
  return (
    <View>
      <ScrollView>
        <View style={styles.constainer}>
          <Image
            source={require('../../assets/check2.png')}
            style={styles.image}
          />
          <Image
            source={require('../../assets/cross.png')}
            style={styles.image}
          />
          <Text style={styles.textTitle}>Mediation resolution</Text>
          <Text style={styles.textSubTitle}>
            The jury evaluated your case and determined that the transaction was
            resolved in your favor.
          </Text>
          <Text style={styles.textSubTitle}>
            The jury evaluated your case and determined that the transaction was
            resolved in favor of {username}
          </Text>
        </View>
      </ScrollView>
      <FooterWhite stylectContainer={styles.footer}>
        <Text style={styles.text}>Comment from jury</Text>
        <View>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            dolor augue, vehicula iaculis odio eu, accumsan molestie ipsum
          </Text>
        </View>
        <View>
          <Text>You received $ 00.00 KSM</Text>
        </View>
        <Button label='Ok'  action={() => props.navigation.navigate('Offers')} />
      </FooterWhite>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  textTitle: {
    fontSize: 18,
    paddingBottom: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
  },
  image: {
    justifyContent: 'center',
    marginVertical: 0,
    marginBottom: 50,
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  textSubTitle: {
    fontSize: 16,
    marginHorizontal: 50,
    textAlign: 'center',
    paddingHorizontal: 8,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
  text: {
    fontSize: 14,
    marginHorizontal: 50,
    textAlign: 'center',
    paddingHorizontal: 8,
    fontFamily: 'Poppins-Regular',
    paddingBottom: '10%',
  },
  detail_transaction: {
    marginVertical: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  footer: {
    paddingBottom: '40%',
  },
});

export default MediationResult;
