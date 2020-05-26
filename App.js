import React from 'react';
import {SafeAreaView,ScrollView } from 'react-native';
import AppNavigator from './src/routes/AppNavigator';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './src/apollo';



function App()  {
  console.disableYellowBox = true;
  return (
    <ApolloProvider client={client}>
      <AppNavigator/>
    </ApolloProvider>
  );
};



export default App;
