import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {FormSignIn} from '../../organisms/Auth'

const SignIn = () => {
    return (
       <View style={styles.container} >
           <FormSignIn/>
       </View>
    );
    
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black',
        height:'100%'
    },
})


export default SignIn;