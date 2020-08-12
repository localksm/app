import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import ls from 'react-native-local-storage';
import { UserData } from '../utils/constants';
import { getSession } from '../apollo';
import { OnboardingImageItem } from '../molecules';
import {
  OnboardingDoneButton,
  OnboardingSkipButton,
  OnboardingNextButton,
} from '../atoms';

const OnboardingImage = (props) => {
  const _onDone = async () => {
    const ins = await ls.get('instruction');
    if (!ins) {
      await ls.save('instruction', true);
    }

    const result = await getSession();
    if (result === null) {
      return props.navigation.navigate('SignIn');
    }
    return props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#2D2D2D' }}>
      <AppIntroSlider
        renderItem={OnboardingImageItem}
        data={UserData}
        onDone={() => _onDone('done')}
        onSkip={() => _onDone('skip')}
        renderDoneButton={OnboardingDoneButton}
        renderNextButton={OnboardingNextButton}
        renderSkipButton={OnboardingSkipButton}
        showSkipButton
        dotStyle={{ backgroundColor: '#747474' }}
        activeDotStyle={{ backgroundColor: 'white' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    color: 'red',
    backgroundColor: '#2D2D2D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingHorizontal: 30,
    fontFamily: 'Poppins-Medium',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'left',
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingBottom: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 30,
    fontFamily: 'Poppins-Medium',
  },
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
  textLink: {
    color: '#cc5841',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
});

export default OnboardingImage;
