import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { isValidValue } from '../utils/hooks';
const InputLayout = ( props ) => 
{
    
    return (
        <>
            { props.children }
            {isValidValue(props.element, props.resultValidator) && <Text style={ styles.textError }> {`${props.resultValidator[props.element]['message'] }`} </Text> }
        </>
    );
}


const styles = StyleSheet.create({
    textError:{
        color: 'red',
        fontFamily: "Poppins-Medium",
        fontSize: 11
    }
});

export default InputLayout;
