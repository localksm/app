import React from 'react';
import Slider from '@react-native-community/slider';

const RangeSlider = () => {
    return (
        <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    );
};

export default RangeSlider;