import React from 'react';

import { View, ActivityIndicator } from 'react-native';

function Loading({ styles }) {
  return (
    <View style={[styles.container, { marginVertical: 30 }]}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

export default Loading;
