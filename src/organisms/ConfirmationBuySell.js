import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from '../atoms';
import { FooterWhite } from '../molecules';

const ConfirmationBuySell = props => {
  const {
    offerAsset,
    requestAsset,
    requestAmount,
    offerAmount,
    operationType,
  } = props.route.params.body;
 
  const valueKSM = 1 * offerAmount / requestAmount

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Image source={require('../../assets/submitted.png')} />
        </View>
        <View>
          <Text style={styles.textTitle}>
            {operationType === 'add_funds' || operationType === 'buy' ? 'Buy' : 'Sell'} submitted{' '}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>Please wait until someone accepts it.</Text>
        </View>
      </View>
      <FooterWhite stylectContainer={styles.containerColum}>
        <View style={styles.colum}>
          <View>
            <Text style={styles.textColumOneRowOne}>Offered</Text>
          </View>
          <View>
            <Text style={styles.textColumOneRowTwo}>
              {offerAmount} {operationType === 'buy' || operationType === 'add_funds' ? offerAsset : requestAsset}
            </Text>
          </View>
        </View>
        <View style={styles.colum}>
          <View>
            <Text style={styles.textColumtwoRowtwo}>Required</Text>
          </View>
          <View>
            <Text style={styles.textColumOneRowTwo}>{requestAmount} KSM</Text>
          </View>
        </View>
        <View style={styles.conversion}>
          <View>
            <Text style={styles.conversionText}>
              1 KSM = $ {valueKSM} {operationType === 'buy' || operationType === 'add_funds' ? offerAsset : requestAsset}
            </Text>
          </View>
        </View>
        <View style={styles.link}>
          <Link label="Cancel" color="#CC5741" />
        </View>
      </FooterWhite>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: '10%',
    paddingTop: '8%',
    paddingBottom: '33%',
  },
  containerColum: {
    flexDirection: 'column',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    marginVertical: '5%',
    paddingTop: '5%',
    paddingBottom: '10%',
    backgroundColor: 'white',
    height: '43%',
    fontFamily: 'Poppins-Medium',
  },
  colum: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    paddingTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    paddingTop: 10,
  },
  textColumOneRowOne: {
    paddingRight: '10%',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  textColumtwoRowtwo: {
    paddingRight: '7%',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  textColumOneRowTwo: {
    paddingLeft: '9%',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  conversion: {
    marginTop: '5%',
    paddingTop: '5%',
    marginBottom: '5%',
    paddingBottom: '5%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#C9C9C9',
    borderBottomWidth: 1,
    borderBottomColor: '#C9C9C9',
    width: '70%',
    marginLeft: '15%',
  },
  conversionText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  link: {
    alignItems: 'center',
  },
});

export default ConfirmationBuySell;
