import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FormLayout } from '../organisms';

const CompletedMultiView = props => {
  return (
    <FormLayout.Content>
      <FormLayout.Body>
        <View style={styles.container}>
              <Image
                source={require('../../assets/check3.png')}
                style={{resizeMode: 'contain'}}
              />

          <View style={styles.title}>
            <Text style={styles.textTitle}>Transaction completed</Text>
            
          </View>
        
            <Text style={styles.text}>{props.title}</Text>
          
          <View style={styles.details}>
            <Text style={styles.text}>{props.details}</Text>
          </View>
        </View>
      </FormLayout.Body>
      <FormLayout.Footer>
        <View style={styles.footer}>
          {props.children}
        </View>
      </FormLayout.Footer>
    </FormLayout.Content>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
    paddingTop: '5%',
    marginHorizontal: '10%',
    paddingBottom: ' 5%',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  text: {
    textAlign: 'center',
    margin: '10%',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  details: {
    borderColor: '#2D2D2D',
    borderWidth: 1,
    borderTopColor: 'white',
    paddingBottom: '20%',
  },
  footer: {
    flex: 1,
    marginHorizontal: '7%',
  }
});

export default CompletedMultiView;