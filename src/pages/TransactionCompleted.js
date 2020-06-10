import React from 'react';
import { View } from 'react-native';
import { HomeLayout, Completed } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';

const TransactionCompleted = props => {
  backHandlerControl(props);
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <Completed {...props} />
      </View>
    </HomeLayout>
  );
};

export default TransactionCompleted;
