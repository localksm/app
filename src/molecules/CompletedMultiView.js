import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CompletedMultiView = props => {
  return (
    <View>
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
      <View style={[styles.flex, props.stylect]}>
        <View style={styles.containerFooter}>
          <View style={styles.footer}>{props.children}</View>
        </View>
      </View>
    </View>
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
  containerFooter: {
    flexDirection: 'column',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    marginTop: '20%',
    backgroundColor: 'white',
    width: '100%',
  },
  footer: {
    marginHorizontal: '7%',
    justifyContent: 'center',
    textAlign: 'center',
    marginVertical: '10%',
    paddingBottom: '10%',
  },
  flex: {
    width: '100%',
    position: 'absolute',
    top: '75%',
  },
});

export default CompletedMultiView;