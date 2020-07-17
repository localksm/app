import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';

const FilePicker = (props) => {
        
    return (
        <>
        <View style={styles.containerPrincipal}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.button}
                onPress={props.SingleFilePicker}>
                    <View style={ styles.container}>
                        <Image
                            style={styles.icon}
                            source={require('../../assets/uploadPhoto.png')}
                        />                                             
                        <Text numberOfLines={1} style={styles.buttonText}>
                            Select images
                        </Text>
                    </View>
            </TouchableOpacity>
            {props.children}
        </View>       

        </>                
    );
};

const styles = StyleSheet.create({
    button: {                
        borderRadius:30,
        borderWidth: 1,
        height:60,
        width: '100%',
        borderColor: 'white'
    },
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    buttonText:{        
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: 'white',      
    },
    containerPrincipal:{
        paddingHorizontal: 10,
        flexDirection:'column',
        flex: 1
    },
    icon:{
        flexDirection: 'row',
        width: 50,
        resizeMode: 'contain',
    }

});

export default FilePicker;