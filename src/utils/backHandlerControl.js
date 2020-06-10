import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { CommonActions } from '@react-navigation/native';

export function backHandlerControl (props) {

  const onBackPress = async props => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Drawer' }],
      }),
    );
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => onBackPress(props));
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () =>
        onBackPress(props),
      );
    };
  }, [BackHandler]);
};

