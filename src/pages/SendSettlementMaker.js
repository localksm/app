import React from 'react';
import { View, Text } from 'react-native';
import { HomeLayout, SendSettlementMakerContent } from '../organisms';
import { styleBackground } from '../utils/styles';

function SendSettlementMaker(props) {
  return (
    <HomeLayout>
      <View style={styleBackground.container}>
        <SendSettlementMakerContent {...props} />
      </View>
    </HomeLayout>
  );
}

export default SendSettlementMaker;
