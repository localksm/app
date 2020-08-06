import React from 'react';

import { View, Text } from 'react-native';

function Error({ error, styles }) {
  return (
    <View style={styles.container}>
      <Text>{`Error! ${error.message}`}</Text>
    </View>
  );
}

export default Error;
