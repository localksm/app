import React, { useState } from 'react';
import RangeSlider from 'rn-range-slider';
import { View, StyleSheet, Text } from 'react-native';
import { Dropdown, Button } from '../atoms';

const Slider = () => {
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(1);
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.text}>Amount</Text>
      </View>
      <View style={styles.containerSlider}>
        <RangeSlider
          style={styles.slider}
          gravity={'center'}
          min={1}
          max={1000}
          initialLowValue={200}
          initialHighValue={900}
          selectionColor="#cc5741"
          labelBackgroundColor="#cc5741"
          labelBorderColor="#AAAAAA40"
          blankColor="#ffffff"
          onValueChanged={(low, high) => {
            setLow(low), setHigh(high);
          }}
        />
      </View>
      <View style={styles.drops}>
        <Dropdown
          label="Preferred Payment Method"
          action={() => {}}
          value="Preferred Payment Method"
          items={[]}
        />
        <Dropdown
          label="Local currency"
          action={() => {}}
          value="Local Currency"
          items={[]}
        />
      </View>
      <Button label="Apply" stylect={styles.buttonApply} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
  },
  containerSlider: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerText: {
    paddingLeft: '5%',
    paddingTop: '10%',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  slider: {
    width: '90%',
    height: '25%',
  },
  buttonApply: {
    backgroundColor: '#DB5A3A',
  },
  drops: {
    paddingBottom: '20%',
  },
});

export default Slider;
