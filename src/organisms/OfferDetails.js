import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Link, Button, InputText } from '../atoms';
import {FooterWhite} from '../molecules';

const OfferDetails = props => {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.left}>
                <Text style={styles.text}>Payment</Text>
                <Text style={styles.textSecond}>Username Maker</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.textAmount}>$ 1 USD -> KSM</Text>
              </View>
            </View>
          </View>

          <View style={styles.form}>
            {/* use expected with apollo implementation */}
            <Text style={styles.text}>Payment Details</Text>
            <InputText placeholder="Name" onChangeText={() => {}} />
            <InputText placeholder="Last Name" onChangeText={() => {}} />
            <InputText
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={() => {}}
            />
          </View>
        </View>
      </ScrollView>
      <FooterWhite stylectContainer={styles.containerButtons}>
          <Button
            label="Confirm"
            action={() =>
              props.navigation.navigate('AcceptedBuy', { type: 'Buy' })
            }
            stylect={styles.buttonConfirm}
          />
          <Link
            label="Cancel"
            color="#cc5741"
            stylect={styles.linkText}
            action={() => {}}
          />
        
      </FooterWhite>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 30,
   
  },
  containerButtons: {
    // paddingTop: '30%',
    paddingBottom: '5%',
  },
  buttonConfirm: {
    marginHorizontal: 20,
  },
  containerFee: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    marginVertical: 5,
    paddingTop: '20%',
    paddingBottom: '10%',
    backgroundColor: 'white',
  },
  form: {
    backgroundColor: '#2D2D2D',
    borderColor: 'white',
    borderWidth: 0.2,
    padding: 20,
    borderRadius: 10,
    borderTopColor: '#ffffff',
    borderStyle: 'solid',
    borderBottomColor: '#ffffff',
    marginTop: 20,
    elevation: 3,
  },

  text: {
    marginVertical: 5,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
  },
  textSecond: {
    fontSize: 15,
    padding: 5,
    color: '#ffffff',
    fontFamily: 'Poppins-Medium',
  },
  textAmount: {
    fontSize: 16,
    paddingLeft: 5,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
    marginVertical: 50,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  loading: {
    flex: 1,
    marginTop: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAmount: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
  },
  textBlod: {
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
  },
  left: {
    width: '50%',
  },
  right: {
    width: '50%',
    flexDirection: 'row-reverse',
    paddingStart: 10,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  feeContainer: {
    backgroundColor: '#FAFAFA',
    marginTop: 0,
    borderRadius: 10,
  },
  linkText: {
    alignItems: 'center',
    fontFamily: 'Poppins-Regular',
    paddingTop: 30,
  },
});

export default OfferDetails;
