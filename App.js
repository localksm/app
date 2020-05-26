import React from 'react';
import {SafeAreaView,ScrollView } from 'react-native';
import AppNavigator from './src/routes/AppNavigator';



function App()  {
  console.disableYellowBox = true;
  return (<AppNavigator/>);
};



export default App;
