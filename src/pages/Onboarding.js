import React, { useEffect, useState } from 'react';
import { OnboardingImage } from '../organisms';
import ls from 'react-native-local-storage';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { styleBackground } from '../utils/styles';

const Onboarding = props => {
  const navigation = useNavigation();
  const [instruction, setInstruction] = useState(true);

  useEffect(() => {
    handleValidateCarouselInstriction = async () => {
      const ins = await ls.get('instruction');
      setInstruction(ins);
      if (ins) {
        navigation.navigate('SignIn');
      }
    };
    handleValidateCarouselInstriction();
  }, []);

  return instruction ? (
    <ActivityIndicator
      style={{
        flex: 1,
        backgroundColor: styleBackground.container.backgroundColor,
      }}
      color="white"
    />
  ) : (
    <OnboardingImage {...props} />
  );
};

export default Onboarding;
