import React from 'react';
import { View } from 'react-native';
import {HeaderLayout, RangeFilter} from '../molecules';

const Filter = () => {
    return (
        <HeaderLayout>
            <View>
                <RangeFilter />
            </View>
        </HeaderLayout>
        
    );
};

export default Filter;