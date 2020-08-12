import React from 'react';
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native';

function OnboardingImageItem({ item }) {
  let { width } = Dimensions.get('window');
  return (
    <View style={styles.slide}>
      <Image
        resizeMethod="resize"
        style={{ width: width - 20, height: width - 70 }}
        source={item.image}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      color: 'red',
      backgroundColor: '#2D2D2D',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      resizeMode: 'contain',
    },
    text: {
      color: 'white',
      textAlign: 'left',
      alignSelf: 'flex-start',
      paddingHorizontal: 30,
      fontFamily: 'Poppins-Medium',
    },
    title: {
      fontSize: 22,
      color: 'white',
      textAlign: 'left',
      fontWeight: 'bold',
      letterSpacing: 1,
      paddingBottom: 5,
      alignSelf: 'flex-start',
      paddingHorizontal: 30,
      fontFamily: 'Poppins-Medium',
    },
  });

export default OnboardingImageItem;
