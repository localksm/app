import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function OnbardingDoneButton() {
  return (
    <View>
      <Text style={styles.controls}>Done</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    fontSize: 17,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 12,
    marginRight: 15,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
});

export default OnbardingDoneButton;
