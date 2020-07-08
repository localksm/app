import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import ls from 'react-native-local-storage';
import { useNavigation } from '@react-navigation/native';

StartingApp = () => {
  // React does NOT allow to use hooks inside function, hook should be used inside function component.
  const navigation = useNavigation();

  useEffect(() => {
    
      handleValidateCarouselInstriction= async()=>{

        const ins =  await ls.get('instruction');               
        if (!ins) {
         setTimeout(()=>{
            navigation.navigate('Onboarding');
         },1000);

        }else{
         setTimeout(()=>{
             navigation.navigate('SignIn')
          },1000);
        }
      }
 handleValidateCarouselInstriction()
  
  }, []);

  const navigateToOnboarding = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <View style={{ ...styles.container }}>
      <StatusBar key="bar" backgroundColor="#2D2D2D" barStyle="light-content" />
      <Image
        style={styles.logo}
        source={require('../../assets/logoKSMNoText.png')}
      />
      <ActivityIndicator size="large" color="white" style={styles.spinner} />
      <Text style={styles.text}> Loading ....</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
  },
  logo: {
    width: '60%',
    height: '40%',
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
  },
  spinner: {
    paddingTop: 5,
  },
});

export default StartingApp;
