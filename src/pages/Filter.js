import React from 'react';
import { View } from 'react-native';
import {HomeLayout, Slider} from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';


const Filter = (props) => {
    backHandlerControl(props);
    return (
        <HomeLayout>
            <View style={styleBackground.container}>
                <Slider />
            </View>
        </HomeLayout>
        
    );
};

export default Filter;