import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputText, Dropdown, Button, Fees, DropdownPaymentMethods  } from '../atoms';
import { FooterWhite } from '../molecules';
import { ScrollView } from 'react-native-gesture-handler';

const FormCreateOfferBuy = props => {
  const [offered, setOffered] = useState('0');
  const [required, setRequired] = useState('');
  const [paymentMethod, setPaymentmethod] = useState('')
  
  const navigation = useNavigation();

  
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Offered Currency</Text>
          <InputText
            name="Amount"
            placeholder="Amount USD"
            onChangeText={value => setOffered(value)}
          />
          <Text style={styles.textRequired}>Required Currency</Text>
          <InputText
            name="Amount"
            placeholder="Amount KSM"
            onChangeText={value => setRequired(value)}
          />
          <DropdownPaymentMethods
            action={setPaymentmethod}
          />
          <Dropdown
            label="Local currency"
            action={() => {}}
            value="Local Currency"
            items={[]}
          />
        </View>
      </ScrollView>
     <FooterWhite stylectContainer={styles.footerContainer}>
         <Fees 
          container={"jury"}
          amount={offered}
          />
         <View style={styles.textFooter}>
             <Text style={styles.footer}>1 KSM = $00.00 USD</Text>
         </View>
         <Button label='Send' action={() => navigation.navigate('Confirmation', {typeOffer: 'Buy'})} />
     </FooterWhite>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '7%',
  },
  text: {
    paddingTop: '1%',
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
    textRequired: {
    paddingTop: '10%',
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  textFooter:{
      alignItems: 'center',
  },
  footer:{
      fontSize: 14,
      fontFamily: 'Poppins-SemiBold',
      paddingBottom:10,
  },
  footerContainer:{
    paddingHorizontal: '15%',
    paddingBottom: '60%',
    height:'41%'

  },
})
  

export default FormCreateOfferBuy;
