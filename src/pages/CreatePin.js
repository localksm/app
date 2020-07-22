import React from 'react';
import { View } from 'react-native';
import { backHandlerControl } from '../utils/backHandlerControl';
import { styleBackground } from '../utils/styles';
import { FormCreatePin, EnterPin } from '../organisms';

const CreatePin = props => {    
    backHandlerControl(props);
    
    return (
        <View style={styleBackground.container}>
            <FormCreatePin/>            
        </View>
    );
}


export default CreatePin;

