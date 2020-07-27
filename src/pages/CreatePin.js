import React from 'react';
import { View } from 'react-native';
import { backHandlerControl } from '../utils/backHandlerControl';
import { styleBackground } from '../utils/styles';
import { FormCreatePin } from '../organisms';

const CreatePin = props => {
  // signup params received as props.route.params
  // To perform the correct action we should look on the type param (email, google, facebook, twitter)
  // I have left this deliberately  to make easier to see the coming params in the next task
  console.log(props.route.params)

  backHandlerControl(props);
  return (
    <View style={styleBackground.container}>
      <FormCreatePin {...props} />
    </View>
  );
};

export default CreatePin;
