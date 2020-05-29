import React from 'react';
import { View } from 'react-native';
import {HomeLayout, Slider} from '../organisms';
import { styleBackground } from '../utils/styles';


const Filter = () => {
    return (
        <HomeLayout>
            <View style={styleBackground.container}>
                <Slider />
            </View>
        </HomeLayout>
        
    );
};

export default Filter;