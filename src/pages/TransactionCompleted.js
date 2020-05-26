import React from 'react';
import { View } from 'react-native';
import { HomeLayout, Completed } from '../organisms';
import { styleBackground } from '../utils/styles';

const TransactionCompleted = props => {
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <Completed {...props} />
      </View>
    </HomeLayout>
  );
};

export default TransactionCompleted;
