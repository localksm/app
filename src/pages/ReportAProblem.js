import React from 'react';
import { View } from 'react-native';
import { Report, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';

const ReportAProblem = props => {
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <Report {...props} />
      </View>
    </HomeLayout>
  );
};

export default ReportAProblem;
