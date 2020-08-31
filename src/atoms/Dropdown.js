import React from 'react';
import {View, StyleSheet } from 'react-native';
import {Icon} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';

function Dropdown(props) {
  const placeholder = {
    label: `${props.value}`,
    value: null,
    color: '#2D2D2D',
    fontFamily: "Poppins-Medium",
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={placeholder}
        style={{...styles.picker, inputIOS: {color: '#ffffff'}, fontFamily: "Poppins-Medium"}}
        inputIOS={styles.picker}
        items={props.items}
        onValueChange={props.action}
        placeholderTextColor="#2D2D2D"
      />
      <Icon name='sort-down' type="FontAwesome" style={styles.icon} />
    </View>
  );
}

Dropdown.defaultProps = {
  value: 'Select an option',
  color: '#2D2D2D',
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#ffffff',
    justifyContent: 'center',
    padding:20,
    fontFamily: "Poppins-Medium",
    borderRadius: 10,
    backgroundColor: '#2D2D2D',
  },
  icon:{
    right:30,
    top: 12,
    position: 'absolute',
    color: 'white'

  },
  picker: {
    height: 60,
    width: 'auto',
    color: '#ffffff',
  },
});

export default Dropdown;
