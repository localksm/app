import React from 'react';
import { View } from 'react-native';
import { backHandlerControl } from '../utils/backHandlerControl';
import { styleBackground } from '../utils/styles';
import { FormCreatePin } from '../organisms';

const CreatePin = props => {
  // signup params received as props.route.params
  // To perform the correct action we should look on the type param (email, google, facebook, twitter)
  console.log(props.route.params) // I have left this deliberately  to make easier to see the coming params in the next task

  backHandlerControl(props);

  return (
    <View style={styleBackground.container}>
      <FormCreatePin />
    </View>
  );
};

export default CreatePin;
