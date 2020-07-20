import React from 'react';
import AppNavigator from './src/routes/AppNavigator';
import { ApolloProvider } from '@apollo/react-hooks';
import { client, ContextProvider, state } from './src/apollo';



function App()  {
  console.disableYellowBox = true;
  return (
    <ApolloProvider client={client}>
      <ContextProvider value={state}>
        <AppNavigator/>
      </ContextProvider>
    </ApolloProvider>
  );
};



export default App;
