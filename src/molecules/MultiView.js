import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MultiView = props => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>{props.title}</Text>
        </View>
        <View style={styles.exchange}>
          <Text style={styles.text}>{props.exchange}</Text>
        </View>
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
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  text: {
    textAlign: 'center',
    margin: '10%',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  exchange: {
    paddingHorizontal: '10%',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderBottomColor: 'white',
  },
  details: {
    paddingHorizontal: '20%',
    paddingBottom: '0%',
  },
  containerFooter: {
    flexDirection: 'column',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    marginTop: '35%',
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

export default MultiView;
