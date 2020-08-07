import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

function Link(props) {
  return (
    <TouchableOpacity
      testID="link"
      style={(styles.btn_session, props.stylect)}
      onPress={props.action}>
      <Text style={{ ...styles.text_btn, color: props.color }}>
        {' '}
        {props.label}{' '}
      </Text>
    </TouchableOpacity>
  );
}

Link.defaultProps = {
  label: 'required name',
  color: '#ffffff',
};

const styles = StyleSheet.create({
  btn_session: {
    height: 30,
  },
  text_btn: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Link;
