import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FooterWhite } from '../molecules';
import { Button } from '../atoms';

const MediationView = props => {
  return (
    <View>
      <ScrollView>
        <View style={styles.constainer}>
          <Image
            source={require('../../assets/mediation.png')}
            style={styles.image}
          />
          <Text style={styles.textTitle}>Your transaction is in mediation</Text>
          <Text style={styles.textSubTitle}>
            Please wait until the jury evaluates your case and makes a decision.
          </Text>
        </View>
      </ScrollView>
      <FooterWhite stylectContainer={styles.footer}>
        <Text style={styles.text}>
          Add any evidence you have to help the jury evaluate your case, such as
          the transaction receipt made using the selected payment method.
        </Text>
        <Button label="Add evidence"  action={() => props.navigation.navigate('WonMediation')} />
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

export default MediationView;
