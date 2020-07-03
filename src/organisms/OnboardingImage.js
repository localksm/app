import React,{ useState } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { UserData } from '../utils/constants';


_renderItem = ({ item }) => {
  let {width} = Dimensions.get('window');
    return (
        <View style={styles.slide}>
        <Image  resizeMethod="resize" style={{ width: (width-20 ), height: (width-70) }}  source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        </View>
    );
}


const OnboardingImage = props => {
  
    const _renderDoneButton =()=> ( <View><Text style={ styles.controls}>Done</Text></View> );
    const _renderNextButton =()=> ( <View><Text style={ styles.controls} >Next</Text></View> );
    const _renderSkipButton =()=> ( <View><Text style={ styles.controls} >Skip</Text></View> );

    // This MUST be called inside the function component, NOT inside a function inside the comppnent
    const navigation = useNavigation();

    const _onDone = input => {      
      navigation.navigate('SignIn');
    };
    

    return(
        <View style={{ flex: 1}}>
            <AppIntroSlider 
                renderItem={_renderItem} 
                data={UserData} 
                onDone={_onDone}
                onSkip={()=> _onDone('skip')}
                renderDoneButton={_renderDoneButton}
                renderNextButton={_renderNextButton}
                renderSkipButton={_renderSkipButton}
                showSkipButton
                dotStyle={{ backgroundColor: '#747474' }}
                activeDotStyle= {{ backgroundColor: 'white' }}
                />
            
      </View>
    );
}

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      color:'red',
      backgroundColor: '#2D2D2D',
      alignItems:'center',
      justifyContent: 'center'
    },
    image: {    
      resizeMode:'contain'
    },
    text: {
      color: 'white',
      textAlign: 'left',
      alignSelf: 'flex-start',
      paddingHorizontal: 30,
      fontFamily: "Poppins-Medium"
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
      fontFamily: "Poppins-Medium"
    },
    controls:{ 
        fontSize: 17, 
        paddingLeft: 5, 
        paddingRight: 5,
        marginTop: 12,
        marginRight: 15, 
        color: 'white',
        fontWeight: 'bold',
        fontFamily: "Poppins-Medium"
    },
    textLink:{
      color: '#cc5841',
      fontSize: 15,
      fontWeight:'bold',
      fontFamily: "Poppins-Medium"
    }
  });


export default OnboardingImage;
