import  React, {useEffect} from 'react';
import { View, Image, StyleSheet, Text, StatusBar, ActivityIndicator } from 'react-native';




const  StartingApp = (props) => {

    useEffect(() => {
        
        setTimeout(()=>{            
            props.navigation.navigate('Auth', { screen: 'Onboarding' })            
        },1000);
    },[]);
    
    
    return (
        <View style={ {...styles.container} } >
             <StatusBar key="bar" backgroundColor="#2D2D2D" barStyle="light-content" />
             <Image 
                style={ styles.logo }
                source={ require('../../assets/logoKSMNoText.png')} />
            <ActivityIndicator size='large'  color='white' style={ styles.spinner}/>
            <Text style={styles.text}> Loading ....</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2D2D2D'
    },
    logo:{
        width: '60%',
        height: '40%',   
        resizeMode: 'contain'     
    },
    text:{
        color:'white'
    },
    spinner:{
        paddingTop: 5,        
    }
});

export default StartingApp;