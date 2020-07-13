import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const InputLayout = ( props ) => 
{
    const isValidValue=( element, payload) => {        
        if (!payload) {
            return false;
        }
        if (Object.keys(payload).length === 0 && payload.constructor === Object) {
            return false;
        }
    
        return payload.hasOwnProperty(element) && payload[element].isInvalid;
    }
    
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
