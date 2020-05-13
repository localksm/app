import  React, {useEffect} from 'react';
import { View, Image, StyleSheet, Text, StatusBar, ActivityIndicator } from 'react-native';



const  StartingApp = (props) => {

    useEffect(() => {        
        setTimeout(()=>{
            props.navigation.navigate('Auth')
        },1000);
    },[]);
    
    
    return (
        <View style={ styles.container } >
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
        backgroundColor: '#000000'
    },
    logo:{
        width: 100,
        height: 100,        
    },
    text:{
        color:'white'
    },
    spinner:{
        paddingTop: 5,        
    }
});

export default StartingApp;