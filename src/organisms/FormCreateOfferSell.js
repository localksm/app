import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputText, Dropdown, Button  } from '../atoms';
import { FooterWhite } from '../molecules';
import { ScrollView } from 'react-native-gesture-handler';

const FormCreateOfferSell = () => {
  const [offered, setOffered] = useState('');
  const [required, setRequired] = useState('');
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
          <Dropdown
            label="Preferred Payment Method"
            action={() => {}}
            value="Preferred Payment Method"
            items={[]}
          />
          <Dropdown
            label="Local currency"
            action={() => {}}
            value="Local Currency"
            items={[]}
          />
        </View>
        <View>
            {/* payment data space */}
        </View>
      </ScrollView>
     <FooterWhite stylectContainer={styles.footerContainer} >
         <View style={styles.textFooter}>
             <Text style={styles.footer}>1 XLM = $00.00 USD</Text>
         </View>
         <Button label='Send' action={() => navigation.navigate('Confirmation', {typeOffer: 'Sell'})} />
     </FooterWhite>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '7%',
  },
  text: {
    paddingTop: '5%',
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  
  textRequired: {
    paddingTop: '12%',
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
    paddingHorizontal: '5%',
    paddingBottom: '25%'

  },
})
  

export default FormCreateOfferSell;