import React,{ useState } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { traderData, UserData } from '../utils/constants';


_renderItem = ({ item }) => {
    return (
        <View style={styles.slide}>
        <Image source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        </View>
    );
}

const Onboarding = props => {

    const [trader, setTrader] = useState(false);
    const _renderDoneButton =()=> ( <View><Text style={ styles.controls}>Done</Text></View> );
    const _renderNextButton =()=> ( <View><Text style={ styles.controls} >Next</Text></View> );
    const _renderSkipButton =()=> ( <View><Text style={ styles.controls} >Skip</Text></View> );

    const _onDone = async input => {
        
        props.navigation.navigate('SignIn')        
    };

    const handlerSwitchUser = async () => setTrader(!trader);


    return(
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <AppIntroSlider 
                renderItem={_renderItem} 
                data={trader?traderData : UserData} 
                onDone={()=> _onDone('done')}
                onSkip={()=> _onDone('skip')}
                renderDoneButton={_renderDoneButton}
                renderNextButton={_renderNextButton}
                renderSkipButton={_renderSkipButton}
                showSkipButton
                />
            <TouchableHighlight onPress={ handlerSwitchUser } underlayColor="white">
              <View style={{  alignItems: 'center', paddingVertical: 25 }} >
                <Text style={ styles.textLink } > { trader?"I'm a user":"I'm a trader" }</Text>
                <Text style={ styles.textLink }> { trader?"Learn how to send a remittance":"Learn how to exchange crypto and fiat"}</Text>
              </View>              
            </TouchableHighlight>
      </View>
    );
}

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      color:'red',
      backgroundColor: 'white',
      alignItems:'center',
      justifyContent: 'center'
    },
    image: {    
      resizeMode:'contain'
    },
    text: {
      color: 'rgba(0,0,0,0.5)',
      textAlign: 'left',
      alignSelf: 'flex-start',
      paddingHorizontal: 30,
      fontFamily: "Poppins-Medium"
    },
    title: {
      fontSize: 22,
      color: 'rgba(0,0,0,0.5)',
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
        color: '#cc5841',
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


export default Onboarding;
