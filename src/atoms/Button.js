import React from 'react';
import {  StyleSheet, TouchableOpacity, Text } from 'react-native';


function Button(props) {

  return (
    <TouchableOpacity style={ [styles.btn_session, props.stylect] }  onPress={ () => props.action() } >
        <Text style={[styles.text_btn, props.stylectLabel]}> {props.label} </Text>
    </TouchableOpacity>
  );
  
}

Button.defaultProps = {    
    label: "required name",
};

const styles = StyleSheet.create({
    btn_session:{                
        backgroundColor: '#2D2D2D',                
    height: 50, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 10
    },
    text_btn:{ 
        color: 'white',
        fontSize: 14,
        fontFamily: "Poppins-Medium",
    }
});

export default Button;