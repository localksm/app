import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Textarea from 'react-native-textarea';
import { FilePicker, FooterWhite } from '../molecules';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../atoms';
import { FormLayout } from '.';

const Report = props => {
    
  return (
    <FormLayout.Content>
      <FormLayout.Body>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.form}>
              <Text style={styles.text}>User:</Text>
              <Text style={styles.text}>Amount $</Text>
              <Text style={styles.text}>Se epera el query</Text>
            </View>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={() => {}}
              defaultValue={''}
              maxLength={120}
              placeholder={'Description of the problem'}
              placeholderTextColor={'white'}
              underlineColorAndroid={'transparent'}
              textColor={'white'}
            />
            <Text style={styles.textEvidence}>
              Please add any evidence you have to help the jury evaluate your
              case, such as the transaction receipt made using the selected
              payment method.
            </Text>
            <FilePicker />
            <View style={styles.gallery}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                <Text style={styles.linkShowImages}>Show Images</Text>
              </TouchableOpacity>
              <Text style={styles.countItem}>4</Text>
            </View>

            <View style={styles.feeContainer}>{/*here must be the FEE  */}</View>

            <ActivityIndicator size="large" color="white" />
          </View>
        </ScrollView>
      </FormLayout.Body>
      <FormLayout.Footer>
        <View style={ styles.contentFooter}>
          <Text style={styles.textContentFooter}>
            *You’ll be charged an extra fee of $0.00 XLM to pay a mediator to
            resolve the dispute. In case the transaction is resolved in your
            favor you’ll get back $0.00 XLM.
          </Text>
          <Button label='Submit' action={() => props.navigation.navigate('Mediation')} />
        </View>
      </FormLayout.Footer>
    </FormLayout.Content>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  text: {
    marginVertical: 3,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  textEvidence: {
    marginVertical: 3,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'white',
    paddingBottom: 20,
  },
  textareaContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    height: 180,
    padding: 5,
    backgroundColor: '#2D2D2D',
    marginVertical: 20,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
  gallery: {
    marginTop: 10,
  },
  linkShowImages: {
    fontSize: 14,
    paddingLeft: 20,
    fontFamily: 'Poppins-Regular',
    color: '#cc5741',
  },
  countItem: {
    fontSize: 14,
    position: 'absolute',
    right: 40,
    top: 0,
    backgroundColor: '#cc5741',
    color: 'white',
    paddingRight: 6,
    paddingLeft: 6,
    borderRadius: 20,
  },
  feeContainer: {
    backgroundColor: '#FAFAFA',
    marginTop: 10,
  },
  footer: {
    paddingBottom: '40%',
  },
  textContentFooter: {
    alignItems: 'center',
    fontSize: 10,
    margin:10
  },
  contentFooter:{
    flex: 1, 
    marginHorizontal:'6%', 
    marginTop:'3%'
  }
});

export default Report;
