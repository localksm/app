import React from 'react';
import { View } from 'react-native';
import { HomeLayout, HelpView } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';

const Help = props => {
    backHandlerControl(props);
    return (
        <HomeLayout>
            <View style={styleBackground.container}> 
                <HelpView/>
            </View>
        </HomeLayout>
    );
};

export default Help;
