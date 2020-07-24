import React from 'react';
import { View } from 'react-native';
import { backHandlerControl } from '../utils/backHandlerControl';
import { styleBackground } from '../utils/styles';
import { FormCreatePin } from '../organisms';

const CreatePin = props => {
  backHandlerControl(props);
  return (
    <View style={styleBackground.container}>
      <FormCreatePin {...props} />
    </View>
  );
};

export default CreatePin;
