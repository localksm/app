import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FooterWhite } from '../molecules';

const Body =( props ) =>{
    const [wpBody, setWPBody] = useState('100%');
    const [hpBody, setHPBody] = useState('70%');

    useEffect(() => {
        if (props.wpBody) {
            setWPBody(props.wpBody);            
        }
        if (props.hpBody) {
            setHPBody(props.hpBody);            
        }       
    },[]);

    return (
        <View style={ stylesspecial_styles({wpBody, hpBody}).body}>
            {props.children}
        </View>
    );
}

const Footer = ( props ) =>{
    const [wpFooder, setWPFooder] = useState('100%');
    const [hpFooder, setHPFooder] = useState('30%');

    useEffect(() => {
        if (props.wpFooder) {
            setWPFooder(props.wpFooder);
        }
        if (props.hpFooder) {                        
            setHPFooder(props.hpFooder);
        }

    },[]);

    return (
        <View style={ stylesspecial_styles({wpFooder, hpFooder}).fooder}>
            <FooterWhite stylectContainer={styles.footerContainer} >
                {props.children}
            </FooterWhite>
        </View>
    );
}


const Content = ( props ) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
    
}

const stylesspecial_styles =( { wpBody, hpBody, wpFooder, hpFooder })=> StyleSheet.create({    
    body:{
        width: wp(wpBody),
        height: hp(hpBody),
    },
    fooder:{
        width: wp(wpFooder),
        height: hp(hpFooder)
    }
});

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    footerContainer:{
        width: '100%',
        height:'100%'        
    }
});




export default {
    Content,
    Body, 
    Footer,
};
