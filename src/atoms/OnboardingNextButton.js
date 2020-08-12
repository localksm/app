import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function OnbardingNextButton() {
  return (
    <View>
      <Text testID="press" style={styles.controls}>
        Next
      </Text>
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

export default OnbardingNextButton;
